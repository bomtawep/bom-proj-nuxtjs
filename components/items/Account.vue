<template>
  <div class="profile-circle">
    <img :src="profile.profileImage" :alt="profile.fullName" />
  </div>
</template>

<script lang="ts" setup>
// Add any script logic here if needed
import {useProfile} from "~/module/users/profile";

const { profile } = useProfile()
</script>

<style scoped>

.profile-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.profile-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>