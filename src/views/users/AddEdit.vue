<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add User';
let user = null;
if (id) {
  title = 'Edit User';
  ({ user } = storeToRefs(usersStore));
  usersStore.getById(id);
}

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  carBrand: Yup.string(),
});

async function onSubmit(values) {
  try {
    let message;
    if (user) {
      await usersStore.update(user.value.id, values);
      message = 'User updated';
    } else {
      await usersStore.register(values);
      message = 'User added';
    }
    await router.push('/users');
    alertStore.success(message);
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1>{{ title }}</h1>
  <template v-if="!(user?.loading || user?.error)">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="user"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-row">
        <div class="form-group col">
          <label>Name*</label>
          <Field
            name="username"
            type="text"
            class="form-input"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group col">
          <label>Car brand*</label>
          <select type="" name="carBrand" id="greatest" required>
            <option value="A">Select something</option>
            <option value="Audi">Audi</option>
            <option value="Tesla">Tesla</option>
            <option value="Maserati">Maserati</option>
            <option value="Porsche">Porsche</option>
            <option value="Lincoln">Lincoln</option>
            <option value="Lexus">Lexus</option>
            <option value="Mustang">Mustang</option>
            <option value="Honda">Honda</option>
            <option value="Kia">Kia</option>
            <option value="Mazda">Mazda</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Save
        </button>
        <router-link to="/users" class="btn btn-link">Cancel</router-link>
      </div>
    </Form>
  </template>
  <template v-if="user?.loading">
    <div class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </template>
  <template v-if="user?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error loading user: {{ user.error }}</div>
    </div>
  </template>
</template>
