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
            v-model="formInline.name"
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
      <div class="content-header">系统自定义脱敏列表</div>

      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="系统名称" width="200">
        </el-table-column>
        <el-table-column
          prop="desenRuleList"
          label="脱敏内容"
          width="400"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column prop="modifytime" label="最后修改时间" min-width="200">
        </el-table-column>
        <el-table-column label="状态" min-width="300">
          <template slot-scope="scope">
            <el-switch
              :value ="scope.row.activateStatus=='1'"
              active-text="启用"
              inactive-text="停用"
              @change = changeState(scope.row)
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="changeClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
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
      <el-drawer
        title="系统自定义编辑"
        :visible.sync="visible"
        style="position: absolute"
        direction="rtl"
        :modal="false"
        :size="'820px'"
      >
        <div class="basic-msg">
          <span style="margin-right: 20px">创建于：{{ createdtime }}</span>
          <span>创建人：{{ createdby }}</span>
        </div>
        <div class="mb20">
          <p style="color: #606266; fontweight: bold">系统名称： {{ name }}</p>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button @click="save" type="primary" size="small">保存</el-button>
        <el-button @click="cancel" size="small">取消</el-button>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  sceneQueryList as _sceneQueryList,
  queryUniOrRoleRuleList as _queryUniOrRoleRuleList,
  sceneUpdate as _sceneUpdate,
  enable as _enable,
} from "@/api/table";

export default {
  data() {
    return {
      formInline: {},
      typeOptions: [{ label: "全部", value: 1 }],
      tableData: [],
      multipleSelection: [],
      pagination: {
        current: 1,
        sizes: [10, 20, 30],
        size: 10,
        total: 0,
      },
      visible: false,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      createdby: "",
      createdtime: "",
      name: "",
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
        sysDesenType: "atUni",
        cond: this.formInline.cond,
        name: this.formInline.name,
        starttime: this.formInline.time ? this.formInline.time[0] : undefined,
        endtime: this.formInline.time ? this.formInline.time[1] : undefined,
      };
      _sceneQueryList(data).then((res) => {
        this.pagination.current = res.data.pageNum;
        this.pagination.size = res.data.pageSize;
        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    changeClick(val) {
      this.cities = [];
      this.checkedCities = [];
      this.visible = true;
      this.createdby = val.createdby;
      this.createdtime = val.createdtime;
      this.sysId = val.sysId;
      this.name = val.name;
      const data = {
        sysId: val.sysId,
      };
      _queryUniOrRoleRuleList(data).then((res) => {
        this.allcities = res.data;
        for (const iterator of res.data) {
          this.cities.push(iterator.desenName);
          if (iterator.check == 1) {
            this.checkedCities.push(iterator.desenName);
          }
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
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    save() {
      let data = {
        ruleList: [],
        sysId: this.sysId,
        sysDesenType: "atUni",
      };
      for (const iterator of this.checkedCities) {
        console.log(iterator);
        for (const item of this.allcities) {
          if (item.desenName == iterator) {
            data.ruleList.push(item.desenId);
          }
        }
      }
      // this.visible = false;
      _sceneUpdate(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.visible = false;
          this.onSubmit();
        }
      });
    },
    cancel() {
      this.visible = false;
    },
    changeState(row){
      const data = {
        activateStatus:row.activateStatus=='0'? '1':'0',
        sysId:[row.sysId]
      }
       _enable(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("状态更新成功");
          this.visible = false;
          this.onSubmit();
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  width: 50px;
  .el-checkbox {
    margin-bottom: 10px;
  }
}
</style>
