<template>
  <div class="content-container">
    <!-- <div v-for="(item, i) in dataList" :key="i">
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
    </div> -->
    <div class="flexC">
      <div>
        <h3>单点登录：</h3>
        <el-form :label-position="labelPosition" label-width="200px">
          <el-form-item label="单点登录注册用户开关：">
            <el-switch
              v-model="switchValue"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
            <el-form-item label="单点登录凭证:">
            <el-input
              v-model="certificate"
            ></el-input>
          </el-form-item>
               <el-form-item label="单点登录人员注册地址:">
            <el-input
              v-model="registerUrl"
            ></el-input>
          </el-form-item>
              <el-form-item label="单点登录校验token地址:">
            <el-input
              v-model="checkTokenUrl"
            ></el-input>
          </el-form-item>
        </el-form>
      <el-form label-width="200px"
        ><el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item></el-form
      >
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryConfigList as _queryConfigList,
  updateConfigList as _updateConfigList,
} from "@/api/common";
export default {
  data() {
    return {
      switchValue: "0",
      certificate:"",
      registerUrl:"",
      checkTokenUrl:"",
      labelPosition: "right",
    };
  },
  created() {
    this.queryConfigList();
  },
  methods: {
    onSubmit() {
      const data = [
        {id:"1",value:this.registerUrl},
        {id:"2",value:this.checkTokenUrl},
        {id:"3",value: this.switchValue},
        {id:"4",value:this.certificate},
      ]
      _updateConfigList(data).then((res) => {
        if (res.code == 200) {
          this.queryConfigList();
          this.$message.success("更新成功");
        }
      });
    },
    queryConfigList() {
      _queryConfigList({ page: 1, size: 10 }).then((res) => {
        // this.dataList = res.data;
        this.registerUrl = res.data.list[0].value
        this.checkTokenUrl = res.data.list[1].value
        this.switchValue = res.data.list[2].value
        this.certificate = res.data.list[3].value
        console.log(res);
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
.flexC {
  display: flex;
  justify-content: center;
}
</style>