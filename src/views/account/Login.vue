<script setup>
import { Form, Field, useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(16, 'Name must be max 16 characters'),
  //carBrand: Yup.string().required('Required').oneOf(products),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, carBrand } = values;
  // return error, username, carBrand, meta, onSubmit;
  await authStore.login(username, carBrand);
}

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: username } = useField('username');
const { value: carBrand } = useField('carBrand');

const body = { username: username.value, carBrand: carBrand.value };

//const body = { username: username.value };
</script>

<template>
  <div class="card m-3" id="forms">
    <h4 class="card-header">Task</h4>
    <div class="card-body">
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label>Name*</label>
          <Field
            v-model="username"
            name="username"
            type="text"
            class="form-input"
            placeholder="Type your name"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="form-group">
          <label>Car brand*</label>
          <select
            name="carBrand"
            v-model="carBrand"
            id="carBrand"
            required=""
            placeholder="Select"
          >
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
          <div class="invalid-feedback">{{ errors.carBrand }}</div>
        </div>
        <div class="form-group">
          <button type="submit" :disabled="!(meta.valid && meta.dirty)">
            Submit
          </button>
          <router-link to="register" class="btn btn-link"
            >Try with created components - Input & Select</router-link
          >
        </div>
        <div class="form-group">
          <span id="req">*required field</span>
        </div>
      </Form>
    </div>
  </div>
</template>
