<template>
  <div id="app">
    <k-form-design 
      :toolbars="['save', 'preview', 'importJson', 'exportJson', 'exportCode']"  
      toolbarsTop 
      ref='kfd' 
      @save="handleSave" 
      title="表单设计器"
    />
    <!-- <k-form-build
      :value="jsonData"
      :dynamicData="dynamicData"
      ref="KFB"
      @submit="handleSubmit"
    /> -->
  </div>
</template>

<script>
import {getForm, addForm, updateForm} from "@/api/workflow/form";
export default {
  data () {
    return {
      // 表单参数
      form: {
        formId: null,
        formName: null,
        content: null,
        remark: null
      },
      dynamicData: {
        cascaderData: [
          {
            value: "1",
            label: "级联1",
            children: [
              { value: "11", label: "级联1-1" },
              { value: "12", label: "级联1-2" }
            ]
          },
          {
            value: "2",
            label: "级联2",
            children: [
              { value: "22", label: "级联2-2" },
              { value: "222", label: "级联2-2" },
              { value: "232", label: "级联2-3" }
            ]
          }
        ]
      },
      jsonData: {
        list: [
          {
            type: "cascader",
            label: "级联选择器",
            icon: "icon-guanlian",
            options: {
              disabled: false,
              showSearch: false,
              placeholder: "请选择",
              clearable: false,
              dynamicKey: "cascaderData",
              dynamic: true,
              options: [
                {
                  value: "1",
                  label: "选项1",
                  children: [{ value: "11", label: "选项11" }]
                },
                {
                  value: "2",
                  label: "选项2",
                  children: [{ value: "22", label: "选项22" }]
                }
              ]
            },
            model: "cascader_1586601654906",
            key: "cascader_1586601654906",
            rules: [{ required: false, message: "必填项" }]
          }
        ],
        config: {
          layout: "horizontal",
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
          hideRequiredMark: false,
          customStyle: ""
        }
      }
    }
  },
  // data() {
  //   return {
  //     dynamicData: {
  //       treeData: [
  //         {
  //           value: "1",
  //           label: "树形选项1",
  //           children: [
  //             { value: "11", label: "树形选项1-1" },
  //             { value: "12", label: "树形选项1-2" }
  //           ]
  //         },
  //         {
  //           value: "2",
  //           label: "树形选项2",
  //           children: [
  //             { value: "21", label: "树形选项2-1" },
  //             { value: "22", label: "树形选项2-2" }
  //           ]
  //         }
  //       ]
  //     },
  //     jsonData: {
  //       list: [
  //         {
  //           type: "treeSelect",
  //           label: "树选择器",
  //           options: {
  //             disabled: false,
  //             multiple: false,
  //             clearable: false,
  //             showSearch: false,
  //             treeCheckable: false,
  //             placeholder: "请选择",
  //             dynamicKey: "treeData",
  //             dynamic: true,
  //             options: []
  //           },
  //           model: "treeSelect_1586601044471",
  //           key: "treeSelect_1586601044471",
  //           rules: [{ required: false, message: "必填项" }]
  //         }
  //       ],
  //       config: {
  //         layout: "horizontal",
  //         labelCol: { span: 4 },
  //         wrapperCol: { span: 18 },
  //         hideRequiredMark: false,
  //         customStyle: ""
  //       }
  //     }
  //   };
  // },
  methods: {
    getData() {
      // 通过函数获取数据
      this.$refs.kfd.getData()
        .then(res => {
          // 获取数据成功
          alert(JSON.stringify(res));
        })
        .catch(err => {
          console.log(err, "校验失败");
        });
    },
    importData () {
      this.$refs.kfd.handleSetData(this.jsonData)
    },
    //点击保存按钮
    handleSave(values) {
      console.log(JSON.stringify(values));
      

      if (this.form.formId != null) {
        console.log("修改表单form=========", this.form)
        this.form.content = values;
        updateForm(this.form).then(response => {
          this.msgSuccess("修改成功");
        });
      } else {
        console.log("新增表单form=========", this.form)
        this.form.formName = '测试表单'
        this.form.remark = '666'
        this.form.content = values;
        // console.log("上传表单数据", this.form)
        addForm(this.form).then(response => {
          this.msgSuccess("新增成功");
        });
      }

      // addForm(this.form).then(response => {
      //   this.msgSuccess("新增成功");
      //   console.log("新增成功response", response)
      // });

      this.$router.go(-1)
    }
  },
  mounted () {
    // this.importData()
    // this.getData()

    const formId =  this.$route.query && this.$route.query.formId;
    if (formId) {
      getForm(formId).then(res =>{
        // this.formConf = JSON.parse(res.data.content);
        // this.drawingList = that.formConf.fields;
        // this.form = res.data;

        console.log("通过formid查回数据", res)
        this.form = res.data
        this.$refs.kfd.handleSetData(JSON.parse(res.data.content))
      })
    }
  }
}
</script>

<style lang='scss'>
@import '@/styles/home';
</style>
