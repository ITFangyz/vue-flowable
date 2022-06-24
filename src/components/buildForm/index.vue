<template>
  <div id="app">
    <k-form-build
      :value="formDataCopy"
      @submit="handleSubmit"
      ref="KFB"
    />
    <div class="bottom-btn">
        <a-button type="primary" @click="submitForm">提交</a-button>
        <a-button type="primary">重置</a-button>
    </div>
    
    <!-- <k-form-build
      :value="jsonData"
      :dynamicData="dynamicData"
      ref="KFB"
      @submit="handleSubmit"
    /> -->
    <!-- <p>{{ formConf }}</p> -->
  </div>
</template>

<script>
import { deepClone } from '@/utils/index'
export default {
    props: {
        formConf: {
            // type: Object,
            required: true
        },
        submit:{
            // type:Object,
            require:false
        },
        formInfo:{
            // type:Object,
            require:false
        }
    },
    data() {
        return {
            initFormData: {},   //表单初始数据
            processParams:{
                variables:null
            },
            formDataCopy:deepClone(this.formConf),
            dynamicData: {
                treeData: [
                {
                    value: "1",
                    label: "树形选项1",
                    children: [
                    { value: "11", label: "树形选项1-1" },
                    { value: "12", label: "树形选项1-2" }
                    ]
                },
                {
                    value: "2",
                    label: "树形选项2",
                    children: [
                    { value: "21", label: "树形选项2-1" },
                    { value: "22", label: "树形选项2-2" }
                    ]
                }
                ]
            },
            // jsonData: {
            //     list: [
            //         {
            //             type: "treeSelect",
            //             label: "树选择器",
            //             options: {
            //             disabled: false,
            //             multiple: false,
            //             clearable: false,
            //             showSearch: false,
            //             treeCheckable: false,
            //             placeholder: "请选择",
            //             dynamicKey: "treeData",
            //             dynamic: true,
            //             options: []
            //             },
            //             model: "treeSelect_1586601044471",
            //             key: "treeSelect_1586601044471",
            //             rules: [{ required: false, message: "必填项" }]
            //         }
            //     ],
            //     config: {
            //         layout: "horizontal",
            //         labelCol: { span: 4 },
            //         wrapperCol: { span: 18 },
            //         hideRequiredMark: false,
            //         customStyle: ""
            //     }
            // }
    };
  },
  watch:{
    formConf(newValue, oldValue){
        console.log(newValue, oldValue)
        this.formDataCopy = newValue
    }
  },
  methods: {
    handleSubmit(){
        // alert("表单提交了")
    },
    submitForm(){
        // this.handleSubmit();
        // 通过函数获取数据
        this.$refs.KFB.getData().then(res => {
            // 获取数据成功
            // alert(JSON.stringify(res));
            Object.assign(this.processParams, res)
            // this.processParams = JSON.stringify(res)
            this.processParams.variables = JSON.stringify(this.formDataCopy)
            this.$emit('submit', this.processParams)
        }).catch(err => {
            console.log(err, "校验失败");
        });
    },
    getData() {
      // 通过函数获取数据
      this.$refs.KFB.getData()
        .then(res => {
            // 获取数据成功
            // console.log("buildForm获取表单数据", JSON.stringify(res));
            this.initFormData = res

            Object.keys(this.initFormData).forEach((key) => {
                // console.log(key, this.initFormData[key])
                if(this.formInfo[key]){
                    this.initFormData[key] = this.formInfo[key]
                }
            })

            //获取表单信息后，回显到界面上
            this.$refs.KFB.setData(this.initFormData)
        })
        .catch(err => {
            console.log(err, "校验失败");
        });
    },
    // importData () {
    //   this.$refs.kfd.handleSetData(this.jsonData)
    // },
    
  },
  created(){
    console.log("子组件接受formInfo", this.formInfo)
    // console.log("子组件接受form-conf", this.formConf)
    
  },
  mounted () {
    
    this.getData()
    
    // if(formInfo.length){

    // }
  }
}
</script>

<style scoped>
.bottom-btn{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>