<template>

  <div class="Boss">

    <!--表格-->
    <a-table :columns="columns" :dataSource="parcerlOrders" bordered>

      <template slot="title" slot-scope="currentPageData">

        <div class="total">


          <div class="add">
            <a-button type="primary" @click="add">+ add</a-button>
          </div>

          <div class="button-State">
            <a-button type="primary" @click="changeState('所有')">所有</a-button>
            <a-button type="primary" @click="changeState('已取件')">已取件</a-button>
            <a-button type="primary" @click="changeState('未取件')">未取件</a-button>
            <a-button type="primary" @click="changeState('已预约')">已预约</a-button>
          </div>

        </div>

      </template>

      <template slot="operation" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
        <a-button v-show="record.state != '已取件'" v-model="index" @click="certain(record)">确认收货</a-button>
      </template>

      <template slot="footer" slot-scope="currentPageData">
        列表更新于：{{currentDate}}
      </template>

    </a-table>

    <!--添加弹窗-->
    <a-modal title="包裹入库" :visible="isVisible" @ok="handleOk" @cancel="handleCancel">

      <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-model="input_orderid"></a-input>
      </a-form-item>
      <a-form-item label="收件人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-model="input_recipient"></a-input>
      </a-form-item>
      <a-form-item label="电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-model="input_tel"></a-input>
      </a-form-item>
      <a-form-item label="状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-model="input_state" disabled></a-input>
      </a-form-item>

    </a-modal>

  </div>

</template>
<script>

  import axios from "axios";

  const columns = [{
    title: '运单号',
    dataIndex: 'orderId',
  }, {
    title: '收件人',
    dataIndex: 'recipient',
  }, {
    title: '电话',
    dataIndex: 'tel',
  }, {
    title: '状态',
    dataIndex: 'state',
  }, {
    title: '预约时间',
    dataIndex: 'appointTime',
  },
    {
      title: '操作',
      key: 'tags',
      dataIndex: 'operation',
      scopedSlots: {customRender: 'operation'},
    }];


  export default {
    name: 'Boss',
    data() {
      return {
        input_orderid: "",
        input_recipient: "",
        input_tel: "",
        input_state: "未取件",
        parcerlOrders: [],
        columns,
        isVisible: false,
        currentDate: new Date()
      }
    },
    methods: {

      handleOk() {

        let formData = {
          'orderId': this.input_orderid,
          'recipient': this.input_recipient,
          'tel': this.input_tel,
          'state': this.input_state,
          'appointTime': ""
        };

        let vm = this;
        axios.post("http://localhost:8080/parcelorders", formData)
          .then((res) => {
            vm.saveOrder(res);
          })
      },

      handleCancel() {
        this.isVisible = false
      },

      add() {
        this.isVisible = true;
      },

      certain(read) {
        let vm = this;
        read.state = "已取件";
        axios.put("http://localhost:8080/parcelorders", read)
          .then((res) => {
            if (res.status === 200) {
              vm.$store.commit("updateOrdersByOrder", res.data)
            }
          })
      },
      changeState(value) {
        console.log(value);
        this.$store.commit("changeTempOrders", value)
      },
      saveOrder(res) {

        if (res.status == 200) {
          this.$store.commit("addOrder", res.data);
          console.log(this.$store.getters.getOrders);
          this.isVisible = false;
        }

      }

    },
    computed: {
      getOrderList() {
        return this.$store.getters.getOrders;
      },
      gettempOrder() {
        return this.$store.getters.getTempOrders;
      }
    },

    watch: {
      getOrderList(value) {
        this.parcerlOrders = value;
      },
      gettempOrder(value) {
        this.parcerlOrders = value;
      }
    },

    mounted: function () {

      let vm = this;

      axios.get("http://localhost:8080/parcelorders")
        .then(function (response) {
          vm.$store.commit("addOrder", response.data);
          console.log(vm.$store.getters.getOrders);
          vm.parcerlOrders = response.data;
        })

    }

  }
</script>


<style>
  .add {
    width: 50px;
    float: left;
  }

  .button-State {
      display: inline;
      width: 500px;
    float: right;
  }

  .total {
    display:inline-block
  }
</style>
