<template>
  <div>
    <div class="title">
      <img :src="subscription ? subscriptioned : subscriptioning" alt="" />
      <span :class="[subscription ? 'bule' : 'gray']">{{
        subscription ? "已订阅" : "未订阅"
      }}</span>
    </div>
    <el-input
      placeholder="接口名称、编码快速查询"
      prefix-icon="el-icon-search"
      v-model="systemName"
      @input="systemNameChange()"
    >
    </el-input>
    <div class="subscript">
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="10%"> </el-table-column>
        <el-table-column label="序号" min-width="20%" align="center">
          <template slot-scope="scope">
            <span>{{
              (pagination.current - 1) * pagination.size + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="接口名称"
          min-width="40%"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="code"
          show-overflow-tooltip
          label="接口编码"
          min-width="30%"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        small
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-size="pagination.size"
        layout=" total,prev, pager, next"
        :total="pagination.total"
        align="right"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import subscriptioned from "@/assets/subscriptioned.png";
import subscriptioning from "@/assets/subscriptioning.png";
import {
  providerSubscribeInterfaceList as _providerSubscribeInterfaceList,
  providerNotSubscribeInterfaceList as _providerNotSubscribeInterfaceList,
  consumerSubscribeInterfaceList as _consumerSubscribeInterfaceList,
  consumerNotSubscribeInterfaceList as _consumerNotSubscribeInterfaceList,
} from "@/api/common";
import { debounce } from "@/utils/index";

export default {
  props: {
    providerOrConsumer: {
      type: Boolean,
      default: true,
    },
    subscription: {
      type: Boolean,
      default: true,
    },
    activeSystemMsg: {
      type: Object,
    },
  },
  data() {
    return {
      subscriptioned,
      subscriptioning,
      systemName: "",
      tableData: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
    };
  },
  watch: {
    activeSystemMsg(newValue, oldValue) {
      this.$refs.multipleTable.clearSelection();
      this.multipleSelection = [];
      this.pagination.current = 1;
      this.tableListData(newValue);
    },
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("checkList", this.multipleSelection);
    },
    tableListData(v) {
      const data = {
        sysId: v.sysId,
        queryCondition: this.systemName,
        page: this.pagination.current,
        size: 10,
      };
      if (this.subscription) {
        if (this.providerOrConsumer) {
          _providerSubscribeInterfaceList(data).then((res) => {
            this.tableData = res.data.list;
            this.pagination.current = res.data.pageNum;
            this.pagination.total = res.data.total;
          });
        } else {
          _consumerSubscribeInterfaceList(data).then((res) => {
            this.tableData = res.data.list;
            this.pagination.current = res.data.pageNum;
            this.pagination.total = res.data.total;
          });
        }
      } else {
        if (this.providerOrConsumer) {
          _providerNotSubscribeInterfaceList(data).then((res) => {
            this.tableData = res.data.list;
            this.pagination.current = res.data.pageNum;
            this.pagination.total = res.data.total;
          });
        } else {
          _consumerNotSubscribeInterfaceList(data).then((res) => {
            this.tableData = res.data.list;
            this.pagination.current = res.data.pageNum;
            this.pagination.total = res.data.total;
          });
        }
      }
    },
    systemNameChange: debounce(function () {
      this.pagination.current = 1;
      this.tableListData(this.activeSystemMsg);
    }, 1000),
    handleCurrentChange(current) {
      this.pagination.current = current;
      this.tableListData(this.activeSystemMsg);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  line-height: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}
img {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.gray {
  color: #7c8086;
}
.bule {
  color: #6d80ca;
}
.el-input {
  margin-bottom: 10px;
}

.subscript {
  height: calc(100vh - 364px);
  overflow-x: hidden;
  //   overflow-y: scroll;
}
.subscript::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.subscript::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: rgba(231, 226, 226, 0.808);
}
</style>