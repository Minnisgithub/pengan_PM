<template>
  <div>
    <div class="content-container search-header">
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="系统名称:">
          <el-input
            v-model="formInline.appName"
            placeholder=""
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建人:">
          <el-input
            v-model="formInline.cond"
            placeholder=""
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建日期:">
          <el-date-picker
            style="width: 360px"
            v-model="formInline.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="选择日期"
            end-placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss "
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container content-drawer">
      <div class="content-header">系统列表</div>
      <div class="button-list">
        <el-button
          size="small"
          class="addButton"
          @click="gotoadd"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button @click="online" size="small">同步</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sysId" label="系统ID" width="200">
        </el-table-column>

        <el-table-column prop="name" label="系统名称" width="200">
        </el-table-column>
        <el-table-column label="脱敏方式" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.sysDesenType == "atUni" ? "自定义" : "按角色"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdby" label="创建人名称" width="200">
        </el-table-column>
        <el-table-column prop="createdtime" label="创建时间" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button @click="changeClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="确定删除？"
              @onConfirm="deleteClick(scope.row)"
            >
              <el-button slot="reference" type="text" size="small"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        layout=" total,prev, pager, next, sizes"
        :total="pagination.total"
        align="right"
      >
      </el-pagination>
      <el-dialog title="新增系统" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="系统ID" :label-width="formLabelWidth" prop="id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="系统名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="脱敏方式"
            :label-width="formLabelWidth"
            prop="region"
          >
            <el-select v-model="form.region" placeholder="请选择脱敏方式">
              <el-option label="自定义" value="atUni"></el-option>
              <el-option label="按角色" value="atRole"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-drawer
        title="脱敏字段编辑"
        :visible.sync="visible"
        style="position: absolute"
        direction="rtl"
        :modal="false"
        :size="'820px'"
      >
        <div class="basic-msg">
          <span style="marginright: 20px">创建于：{{ createdtime }}</span>
          <span>创建人：{{ createdby }}</span>
        </div>
        <el-form :model="changeform" :rules="rules" ref="changeform">
          <el-form-item label="系统ID" :label-width="formLabelWidth" prop="id">
            <el-input v-model="changeform.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="系统名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="changeform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="脱敏方式"
            :label-width="formLabelWidth"
            prop="region"
          >
            <el-select v-model="changeform.region" placeholder="请选择脱敏方式">
              <el-option label="自定义" value="atUni"></el-option>
              <el-option label="按角色" value="atRole"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth"
            ><el-button @click="save('changeform')" type="primary" size="small"
              >保存</el-button
            >
            <el-button @click="cancel" size="small"
              >取消</el-button
            ></el-form-item
          >
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  dictqueryList as _dictqueryList,
  dictadd as _dictadd,
  dictupdate as _dictupdate,
  dictdelete as _dictdelete,
  dictonline as _dictonline,
} from "@/api/table";
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      multipleSelection: [],
      pagination: {
        current: 1,
        sizes: [10, 20, 30],
        size: 10,
        total: 0,
      },
      visible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入系统名称", trigger: "blur" }],
        id: [{ required: true, message: "请输入系统ID", trigger: "blur" }],
        region: [
          { required: true, message: "请选择脱敏方式", trigger: "change" },
        ],
      },
      createdtime: "",
      createdby: "",
      changeform: {},
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    onSubmit() {
      const data = {
        page: this.pagination.current,
        size: this.pagination.size,
        cond: this.formInline.cond,
        name: this.formInline.appName,
        starttime: this.formInline.time ? this.formInline.time[0] : undefined,
        endtime: this.formInline.time ? this.formInline.time[1] : undefined,
      };
      _dictqueryList(data).then((res) => {
        this.pagination.current = res.data.pageNum;
        this.pagination.size = res.data.pageSize;
        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    deleteClick(val) {
      _dictdelete({ id: val.sysListId }).then((res) => {
        if (res.code == 200) {
          this.$message.success("成功删除");
          this.onSubmit();
        }
      });
    },
    handleCurrentChange(current) {
      this.pagination.current = current;
      this.onSubmit();
    },
    handleSizeChange(current) {
      this.pagination.size = current;
      this.pagination.current = 1;
      this.onSubmit();
    },
    gotoadd() {
      this.dialogFormVisible = true;
    },
    addForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            sysId: this.form.id,
            name: this.form.name,
            sysDesenType: this.form.region,
          };
          _dictadd(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.dialogFormVisible = false;
              this.$message.success("新增成功");
              this.onSubmit();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeClick(val) {
      this.createdby = val.createdby;
      this.createdtime = val.createdtime;
      this.visible = true;
      this.changeform = {
        name: val.name,
        id: val.sysId,
        sysListId: val.sysListId,
        region: val.sysDesenType,
      };
    },
    save(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            sysId: this.changeform.id,
            name: this.changeform.name,
            sysDesenType: this.changeform.region,
            sysListId: this.changeform.sysListId,
          };
          _dictupdate(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.visible = false;
              this.$message.success("修改成功");
              this.onSubmit();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.visible = false;
    },
    online() {
      this.$confirm("此操作将同步, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _dictonline().then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "同步成功!",
              });
              this.onSubmit();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消同步",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__body {
  .el-input__inner {
    width: 300px;
  }
}
</style>
