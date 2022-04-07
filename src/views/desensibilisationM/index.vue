<template>
  <div>
    <div class="content-container search-header">
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="脱敏字段编码:">
          <el-input
            v-model="formInline.applicationNo"
            placeholder=""
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="脱敏类型:">
          <el-select
            style="width: 140px"
            clearable
            v-model="formInline.replaceType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.title"
              :label="item.value"
              :value="item.title"
            >
            </el-option>
          </el-select>
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
      <div class="content-header">脱敏列表</div>
      <div class="button-list">
        <el-button
        v-show="addShow"
          size="small"
          class="addButton"
          @click="gotoadd"
          icon="el-icon-plus"
          >新增</el-button
        >
        <!-- <el-button size="small">删除</el-button> -->
      </div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desenName" label="脱敏字段名称" width="160">
        </el-table-column>
        <el-table-column
          prop="desenColumn"
          label="脱敏字段编码"
          show-overflow-tooltip
          width="300"
        >
        </el-table-column>
        <el-table-column prop="replaceTypeName" label="脱敏类型" width="200">
        </el-table-column>
        <el-table-column prop="createdtime" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="createdby" label="创建人" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button @click="changeClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <!-- <el-button @click="deleteClick(scope.row)" type="text" size="small"
              >删除</el-button
            > -->
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
        layout=" total,prev, pager, next, sizes"
        :total="pagination.total"
        align="right"
      >
      </el-pagination>
      <el-drawer
        title="脱敏字段编辑"
        :visible.sync="visible"
        style="position: absolute"
        direction="rtl"
        :modal="false"
        :size="'820px'"
      >
        <div class="basic-msg">
          <span style="margin-right: 20px">创建于：{{createdtime}}</span>
          <span>创建人：{{createdby}}</span>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="脱敏字段名称" prop="name">
            <el-input v-model="ruleForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="字段编码" prop="number">
            <el-input v-model="ruleForm.number" size="small"></el-input>
          </el-form-item>
          <el-form-item label="脱敏类型" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="unreversible_const">固定长度脱敏</el-radio>
              <el-radio label="unreversible_back">动态长度脱敏</el-radio>
              <el-radio label="unreversible_regular">正则表达脱敏</el-radio>
              <el-radio label="reversible_base64">base64加密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="
              ruleForm.resource == 'unreversible_const' ||
              ruleForm.resource == 'unreversible_back'
            "
            :label="
              ruleForm.resource == 'unreversible_const'
                ? '固定长度脱敏'
                : '动态长度脱敏'
            "
            prop="resourceDetail"
          >
            <el-radio-group v-model="ruleForm.resourceDetail">
              <el-radio label="全部"></el-radio>
              <el-radio label="自定义"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show="
              ruleForm.resource == 'unreversible_const' ||
              ruleForm.resource == 'unreversible_back'
            "
            v-if="ruleForm.resourceDetail == '自定义'"
            prop="custom"
          >
            {{ruleForm.resource == 'unreversible_const'?'起始位置':'前预留位置'}} ：
            <el-input-number
              v-model="ruleForm.num1"
              :min="0"
              label="描述文字"
              size="small"
            ></el-input-number>
             {{ruleForm.resource == 'unreversible_const'?'脱敏长度':'后预留位置'}} ：
            <el-input-number
              v-model="ruleForm.num2"
              :min="0"
              label="描述文字"
              size="small"
            ></el-input-number>
            <el-radio-group style="marginleft: '2px'" v-model="ruleForm.num3">
              <el-radio label="脱敏"></el-radio>
              <el-radio label="不脱敏"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.resource == 'unreversible_regular'"
            label="正则表达脱敏"
            prop="zzDetail"
          >
            <el-input
              v-model="ruleForm.zzDetail"
              size="small"
              type="textarea"
            ></el-input>
             <el-radio-group  v-model="ruleForm.num3">
            <el-radio label="脱敏"></el-radio>
            <el-radio label="不脱敏"></el-radio>
          </el-radio-group>
          </el-form-item>
          <el-form-item label="脱敏目标样式" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio-button label="*" name="type"></el-radio-button>
              <el-radio-button label="/" name="type"></el-radio-button>
              <el-radio-button label="#" name="type"></el-radio-button>
              <el-radio-button label="%" name="type"></el-radio-button>
              <el-radio-button label="-" name="type"></el-radio-button>
              <el-radio-button label="+" name="type"></el-radio-button>
              <el-radio-button label="■" name="type"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  ruleQueryList as _ruleQueryList,
  ruleQueryRuleType as _ruleQueryRuleType,
  ruleUpdate as _ruleUpdate,
  ruleDelete as _ruleDelete,
} from "@/api/table";

export default {
  data() {
    return {
      formInline: {},
      typeOptions: [],
      tableData: [],
      multipleSelection: [],
      pagination: {
        current: 1,
        sizes: [10, 20, 30],
        size: 10,
        total: 0,
      },
      visible: false,
      ruleForm: {
        name: "",
        number: "",
        resource: "",
        resourceDetail: "自定义",
        type: "",
        num1: "",
        num2: "",
        num3: "",
        zzDetail: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入脱敏字段名称", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入字段编码", trigger: "blur" },
        ],
        resource: [
          { required: true, message: "请选择脱敏类型", trigger: "change" },
        ],
        resourceDetail: [
          { required: true, message: "请选择类型", trigger: "change" },
        ],
        zzDetail: [{ required: true, message: "请输入规则", trigger: "blur" }],
        type: [
          { required: true, message: "请选择脱敏目标样式", trigger: "change" },
        ],
      },
      desenId: "",
      createdby: "",
      createdtime: "",
      addShow:false,
    };
  },
  created() {
    _ruleQueryRuleType().then((res) => {
      this.typeOptions = res.data;
    });
    this.onSubmit();
    this.addShow = this.$store.state.user.pgPermissionKeys.indexOf('新增规则') != -1 
  },
  methods: {
    onSubmit() {
      console.log(this.formInline.time);
      const data = {
        page: this.pagination.current,
        size: this.pagination.size,
        desenColumn: this.formInline.applicationNo,
        replaceType: this.formInline.replaceType,
        starttime: this.formInline.time ? this.formInline.time[0] : undefined,
        endtime: this.formInline.time ? this.formInline.time[1] : undefined,
      };
      _ruleQueryList(data).then((res) => {
        console.log(res);
        this.pagination.current = res.data.pageNum;
        this.pagination.size = res.data.pageSize;
        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeClick(val) {
      this.ruleForm = {
        name: val.desenName,
        number: val.desenColumn,
        resource: val.replaceType,
        num1: val.replaceIndex,
        num2: val.replaceLength,
        num3: val.activateFlag == "0" ? "不脱敏" : "脱敏",
        type: val.desenChar,
        zzDetail: val.replaceMatch,
        resourceDetail: val.replaceDetail,
      };
      this.desenId = val.desenId;
      this.createdby = val.createdby;
      this.createdtime = val.createdtime;
      this.visible = true;
    },
    deleteClick(val) {
      const data = {
        id: val.desenId,
      };
      _ruleDelete(data).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.onSubmit();
        } else {
          this.$message.error(res.data);
        }
      });
    },
    handleCurrentChange(current) {
      this.pagination.current = current;
      this.onSubmit();
    },
    handleSizeChange(current) {
      this.pagination.size = current;
       this.pagination.current =1
      this.onSubmit();
    },
    gotoadd() {
      this.$router.replace("/desensibilisationM/addDesensibilisationM");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            desenName: this.ruleForm.name,
            desenColumn: this.ruleForm.number,
            replaceType: this.ruleForm.resource,
            replaceIndex: this.ruleForm.num1,
            replaceLength: this.ruleForm.num2,
            activateFlag: this.ruleForm.num3 == "脱敏" ? "1" : "0",
            desenChar: this.ruleForm.type,
            replaceMatch: this.ruleForm.zzDetail,
            desenId: this.desenId,
          };
          _ruleUpdate(data).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.visible = false;
              this.onSubmit();
            } else {
              this.$message.error(res.data);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-drawer {
  .el-form {
    width: 800px;
  }
  .el-radio-button {
    margin-right: 10px;
  }
  ::v-deep .el-radio-button__inner {
    border-left: 1px solid #dcdfe6;
  }
  .el-input {
    width: 300px;
  }
  ::v-deep .el-textarea__inner {
    width: 300px;
  }
  .el-input-number {
    margin-right: 10px;
  }
  .el-textarea{
  width: 300px;
  margin-right: 10px;
}
}
</style>
