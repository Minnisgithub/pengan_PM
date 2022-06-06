<template>
  <div class="content-container">
    <div v-for="(item, i) in dataList" :key="i">
      <h3>{{ item.moduleName }}</h3>
      <el-form
        v-for="(v, index) in item.moduleArray"
        :key="index"
        :label-position="labelPosition"
        label-width="200px"
        :model="v"
      >
        <el-form-item :label="v.configName + ':'">
          <el-input v-if="v.configType == 1" v-model="v.configValue"></el-input>
          <el-switch
            v-if="v.configType == 2"
            v-model="v.configValue"
            active-value="Y"
            inactive-value="N"
          ></el-switch>
          <el-input-number
            v-if="v.configType == 3"
            v-model="v.configValue"
          ></el-input-number>
          <span class="description">提示：{{ v.description }}</span>
        </el-form-item>
      </el-form>
    </div>
    <el-form label-width="200px"
      ><el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item></el-form
    >
  </div>
</template>

<script>
import {
  queryConfigList as _queryConfigList,
  updateConfigList as _updateConfigList,
} from "@/api/table";
export default {
  data() {
    return {
      dataList: [],
      labelPosition: "right",
    };
  },
  created() {
    this.queryConfigList();
  },
  methods: {
    onSubmit() {
      _updateConfigList({ data: this.dataList }).then((res) => {
        if (res.code == 200) {
          this.queryConfigList();
          this.$message.success("更新成功");
        }
      });
    },
    queryConfigList() {
      _queryConfigList().then((res) => {
        this.dataList = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 400px;
}
.description {
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.5);
}
</style>