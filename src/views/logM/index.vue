<template>
  <div>
    <div class="content-container search-header">
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
       <el-form-item label="操作人:">
          <el-input
            v-model="formInline.operaby"
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
      <div class="content-header">操作日志记录</div>

      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
         <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operatime" label="操作时间" width="200">
        </el-table-column>
        <el-table-column prop="operaby" label="操作人" width="200">
        </el-table-column>
        <!-- <el-table-column prop="funcModule" label="操作模块" width="200">
        </el-table-column> -->
        <el-table-column prop="operaLog" label="详情" min-width="200">
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
  </div>
</template>

<script>
import { logQueryList as _logQueryList } from "@/api/table";
export default {
  data() {
    return {
      formInline: {},
      tableData: [
      ],
      pagination: {
        current: 1,
        sizes: [10, 20, 30],
        size: 10,
        total: 0,
      },
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
        operaby: this.formInline.operaby,
        starttime: this.formInline.time ? this.formInline.time[0] : undefined,
        endtime: this.formInline.time ? this.formInline.time[1] : undefined,
      };
      _logQueryList(data).then((res) => {
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
    handleSizeChange(current) {
      this.pagination.size = current;
      this.pagination.current = 1
      this.onSubmit();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
