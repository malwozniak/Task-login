<script setup>
import { Form, Field, useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(16, 'Name must be a max 16 characters'),
  // carBrand: Yup.object().shape({
  //   label: Yup.string().required('Required'),
  //   value: Yup.string().required('Required'),
  // }),
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();
  try {
    await usersStore.register(values);
    await router.push('/account/login');
    alertStore.success('Registration successful');
    // return error, username, carBrand, meta, onSubmit;
  } catch (error) {
    alertStore.error(error);
  }
}

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: username } = useField('username');
const { value: carBrand } = useField('carBrand');

const body = { username: username.value, carBrand: carBrand.value };
</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Register</h4>
    <div class="card-body">
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label>Name*</label>
          <Field
            name="username"
            placeholder="Type your name"
            type="text"
            class="form-input"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="form-group">
          <label>Car brand*</label>
          <select name="carBrand" v-model="carBrand" id="carBrand">
            <option disabled value="">Select</option>
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
        <div class="form-group">
          <button type="submit" :disabled="!(meta.valid && meta.dirty)">
            Submit
          </button>
          <router-link to="login" class="btn btn-link">Cancel</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
