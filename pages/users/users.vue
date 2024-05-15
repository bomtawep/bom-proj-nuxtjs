<template>
  <div>
    <h1>Users</h1>
    <UButton @click="createUser">
      Create user
    </UButton>
    <ul v-if="data">
      <li v-for="user in data" :key="user.id">
        {{ user.firstname }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import useUsersApi from '~/api/users';
  import type { TUser } from '~/types/users/users';

  const router = useRouter();
  const createUser = () => {
    router.push('/users/create');
  };

  const { getUsers } = useUsersApi();
  const data = ref<TUser[]>([]);
  const fetchUsers = async () => {
    const response = await getUsers();
    console.log(response.data, 'data');
    data.value = response.data.user;
  };
  onMounted(
      fetchUsers
  )

</script>