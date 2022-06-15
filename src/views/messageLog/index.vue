<template>
  <div>
    <div class="content-container search-header">
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="消息ID:">
              <el-input v-model="formInline.resId" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="消息名称:">
              <el-input
                v-model="formInline.interfaceNameOrCode"
                placeholder="名称检索"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="患者ID:">
              <el-input
                v-model="formInline.patientId"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="调用方:">
              <el-input
                v-model="formInline.resSysNameOrCode"
                placeholder="厂商系统名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="调用状态：">
              <el-select v-model="formInline.result">
                <el-option label="全部" value=""></el-option>
                <el-option label="成功" value="成功"></el-option>
                <el-option label="失败" value="失败"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="日志时间:">
              <el-date-picker
                style="width: 360px"
                v-model="formInline.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="截止时间"
                value-format="yyyy-MM-dd HH:mm:ss "
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSubmit(1, 10)"
                >查询</el-button
              >
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-container content-drawer">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="resId"
          label="消息ID"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="patientId"
          label="患者ID"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="interfaceName"
          label="消息名称"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column width="140" label="消息内容">
          <template slot-scope="scope">
            <el-link type="primary" @click="openXML(scope.row.xmlIn)">
              XML
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="响应内容" width="140">
          <template slot-scope="scope">
            <el-link type="primary" @click="openXML(scope.row.xmlOut)">
              XML
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="调用状态" width="100">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              :type="scope.row.result == '失败' ? 'danger' : 'success'"
            >
              {{ scope.row.result }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="reqSysName"
          label="调用方"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column prop="lastTime" label="日志时间" min-width="180">
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
    </div>
    <el-dialog title="XML详情" :visible.sync="dialogVisible">
      <div>
        <pre v-highlightjs="xml_show"> 
          <code class="highlight_s"> 
        {
          border: 10px solid #fff;
        }
        </code>
        </pre>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { serviceLogList as _serviceLogList } from "@/api/common";
import vkbeautify from "vkbeautify";

export default {
  data() {
    return {
      formInline: { result: ""},
      tableData: [],
      multipleSelection: [],
      pagination: {
        current: 1,
        sizes: [10, 20, 30],
        size: 10,
        total: 0,
      },
      dialogVisible: false,
      xml_show: "",
    };
  },
  created() {
    this.onSubmit(1, 10);
  },
  methods: {
    onSubmit(current, size) {
      const data = {
        resId: this.formInline.resId,
        interfaceNameOrCode: this.formInline.interfaceNameOrCode,
        patientId: this.formInline.patientId,
        resSysNameOrCode: this.formInline.resSysNameOrCode,
        result: this.formInline.result,
        page: current || this.pagination.current,
        size: size || this.pagination.size,
        beginTime: this.formInline.time ? this.formInline.time[0] :this.$moment().add(-7, 'd').format("YYYY-MM-DD HH:mm:ss "),
        endTime: this.formInline.time ? this.formInline.time[1] : this.$moment().add(0, 'd').format("YYYY-MM-DD HH:mm:ss "),
      };
      _serviceLogList(data).then((res) => {
        this.pagination.current = res.data.pageNum;
        this.pagination.size = res.data.pageSize;
        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleCurrentChange(current) {
      this.pagination.current = current;
      this.onSubmit();
    },
    handleSizeChange(size) {
      this.pagination.size = size;
      this.pagination.current = 1;
      this.onSubmit();
    },
    reset() {
      this.formInline = { result: "" };
      this.onSubmit(1, 10);
    },
    openXML(xml) {
      this.xml_show = vkbeautify.xml(xml);
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
::v-deep .el-dialog__body{
  padding: 0 10px;
}
.content-drawer{
  min-height: calc(100vh - 320px);
}
</style>
