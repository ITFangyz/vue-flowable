<template>
  <div id="app">
    <k-form-design 
      :toolbars="['save', 'preview', 'importJson', 'exportJson', 'exportCode']"  
      toolbarsTop 
      ref='kfd' 
      @save="handleSave" 
      title="表单设计器"
    />
    <!--表单配置详情-->
    <el-dialog :title="formTitle" :visible.sync="formOpen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="表单名称" prop="formName">
          <el-input v-model="form.formName" placeholder="请输入表单名称" />
        </el-form-item>
        <el-form-item label="表单备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入表单备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getForm, addForm, updateForm} from "@/api/workflow/form";
export default {
  data () {
    return {
      formOpen: false,
      formTitle: "",
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
  methods: {
    // 取消按钮
    cancel() {
      this.formOpen = false;
      this.reset();
    },
    /** 保存表单信息 */
    submitForm(){
      console.log("新增表单form=========", this.form)
      // this.form.formName = '测试表单'
      // this.form.remark = '666'
      // this.form.content = values;
      // console.log("上传表单数据", this.form)
      addForm(this.form).then(response => {
        this.msgSuccess("新增成功");
      });
      this.$router.push({ path: '/flowable/form'})
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.form.formId != null) {
      //       updateForm(this.form).then(response => {
      //         this.msgSuccess("修改成功");
      //       });
      //     } else {
      //       console.log("新增表单form=========", this.form)
      //       addForm(this.form).then(response => {
      //         this.msgSuccess("新增成功");
      //       });
      //     }
      //     this.drawingList = []
      //     this.idGlobal = 100
      //     this.open = false;
      //     // 关闭当前标签页并返回上个页面
      //     this.$store.dispatch("tagsView/delView", this.$route);
      //     this.$router.go(-1)
      //   }
      // });
    },
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
        this.$router.push({ path: '/flowable/form'})
      } else {
        this.formOpen = true;
        this.formTitle = "添加表单";
        this.form.content = values;
        
      }

      // addForm(this.form).then(response => {
      //   this.msgSuccess("新增成功");
      //   console.log("新增成功response", response)
      // });

      
    },
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
