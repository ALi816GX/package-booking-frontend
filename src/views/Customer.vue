<template>
  <div class="Customer">

    <a-button type="primary" @click="AddInfoMation">预约取件</a-button>

    <div>
      <a-modal title="预约取件" :visible="isVisbile" @ok="handleOk" @cancel="handleCancel">
        <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="input_orderid"></a-input>
        </a-form-item>
        <a-form-item label="取件时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-date-picker v-model="getGoods_date"/>
          <a-time-picker v-model="getGoos_time"/>
        </a-form-item>
      </a-modal>
    </div>

  </div>

</template>


<script>

  import moment from 'moment';
  import axios from "axios";

  export default {
    name: 'Customer',
    data() {
      return {

        isVisbile: false,
        input_orderid:"",
        getGoods_date:new moment(),
        getGoos_time:new moment(),
        getGoodsDateTime:new moment()

      }
    },

    methods: {



      handleOk() {

        this.getGoodsDateTime = moment(this.getgoods_date).format("YYYY-MM-DD") + " " + moment(this.getgoos_time).format("HH:MM:SS");;
        let parcelOrder = this.$store.getters.getOrderByOrderId(this.input_orderid);
        parcelOrder.appointTime = this.getGoodsDateTime;
        parcelOrder.state = "已预约";
        axios.put("http://localhost:8080/parcelorders", parcelOrder)
          .then((res) => {
            if(res.data === 200){
              vm.$store.commit("updateOrdersByOrder", res.data)
              vm.isVisible = false;
            }
          })

        this.isVisbile = false;
      },
      handleCancel() {
        this.isVisbile = false;
      },
      AddInfoMation() {
        this.isVisbile = true;
      }

    }
  }

</script>
