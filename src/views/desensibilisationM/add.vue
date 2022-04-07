<template>
  <div>
    <div class="content-container">
      <div class="headerB">
        <div class="content-header">脱敏列表</div>
        <div class="pointer">
          <i class="el-icon-refresh-left" @click="goback"></i>
        </div>
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
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ruleAdd as _ruleAdd } from "@/api/table";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        number: "",
        resource: "",
        resourceDetail:"自定义",
        type: "",
        num1:'',
        num2:'',
        num3:'脱敏',
        zzDetail:''
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
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          const data = {
            desenName: this.ruleForm.name,
            desenColumn: this.ruleForm.number,
            replaceType: this.ruleForm.resource,
            replaceIndex: this.ruleForm.num1,
            replaceLength: this.ruleForm.num2,
            activateFlag: this.ruleForm.num3 == '脱敏' ? '1':'0',
            desenChar: this.ruleForm.type,
            replaceMatch:this.ruleForm.zzDetail,
            replaceDetail:this.ruleForm.resourceDetail,
          };
          _ruleAdd(data).then((res) => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$router.replace("/desensibilisationM/DesensibilisationM");
            } else {
              this.$message.error(res.data);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
       this.$router.replace("/desensibilisationM/DesensibilisationM");
    },
    goback() {
       this.$router.replace("/desensibilisationM/DesensibilisationM");
    },
  },
};
</script>

<style lang="scss" scoped>
.headerB {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
}
.pointer {
  cursor: pointer;
}
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
</style>