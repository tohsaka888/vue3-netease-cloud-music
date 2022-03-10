<template>
  <div class="sider" :class="reactiveStyle.width" v-if="!loginStatus">
    <div class="center" style="margin-top: 24px;">
      <el-image src="https://p.qqan.com/up/2021-2/16137992359659254.jpg" class="avatar" />
    </div>
    <div class="center" style="margin-top: 24px;">
      <el-button type="primary">登录</el-button>
      <el-button>注册</el-button>
    </div>
    <el-menu style="margin-top: 16px;" default-active="1">
      <el-menu-item index="1">
        <div class="text-center center">
          <SettingOutlined style="margin-right: 8px;" />没想好的功能
        </div>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="text-center center">
          <SettingOutlined style="margin-right: 8px;" />没想好的功能
        </div>
      </el-menu-item>
      <el-menu-item index="3">
        <div class="text-center center">
          <SettingOutlined style="margin-right: 8px;" />没想好的功能
        </div>
      </el-menu-item>
      <el-menu-item index="4">
        <div class="text-center center">
          <SettingOutlined style="margin-right: 8px;" />没想好的功能
        </div>
      </el-menu-item>
      <el-menu-item index="5">
        <div class="text-center center">
          <SettingOutlined style="margin-right: 8px;" />没想好的功能
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue'
import reactiveStyle from './reactiveStyle';
import './index.css'

const loginStatus = ref<boolean>(false)

</script>