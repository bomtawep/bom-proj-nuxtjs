<template>
  <div>
    <h1>Users</h1>
    <UButton @click="createUser">
      Create user
    </UButton>
    <ul v-if="data">
      <li v-for="user in data" :key="user.firstname + user.lastname + new Date()">
        {{ user.firstname }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import useUsersApi from '~/api/users';
  import type { TPersonalInfo } from '~/types/users/users';

  const router = useRouter();
  const createUser = () => {
    router.push('/users/create');
  };

  const { getUsers } = useUsersApi();
  const data = ref<TPersonalInfo[]>([]);
  const fetchUsers = async () => {
    const response = await getUsers();
    data.value = response.data.user;
  };
  onMounted(
      fetchUsers
  )

</script>