<script setup>
import { Form, Field, useField, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';

//import { Select } from '@/components/Select.vue';

import Input from '@/components/Input.vue';
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
function onSubmit(values) {
  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
}
// async function onSubmit(values) {
//   const authStore = useAuthStore();
//   const { username } = values;
//   // return error, username, carBrand, meta, onSubmit;
//   await authStore.login(username);
// }

const { errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: username } = useField('username');
const { value: carBrand } = useField('carBrand');

const body = { username: username.value, carBrand: carBrand.value };

//const body = { username: username.value };
</script>

<script>
import Select from '@/components/Select.vue';

export default {
  components: {
    Select,
  },
};
</script>
<template>
  <div class="card m-3">
    <h4 class="card-header">Try component Input & Select</h4>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="form-group">
          <Input
            name="username"
            v-model="username"
            placeholder="Type your name"
            :label="{ value: 'Name*', for: 'username' }"
            class="form-input"
            :classes="{ input: 'w-3/4 lg:w-1/3' }"
            @blur="form.text.$validate()"
          />

          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="form-group">
          <label>Car brand*</label>
          <Select
            :options="[
              'Select',
              'Audi',
              'Tesla',
              'Maserati',
              'Porsche',
              'Lincoln',
              'Lexus',
              'Mustang',
              'Honda',
              'Kia',
              'Mazda',
            ]"
            :default="'Select'"
            class="select"
          />
          <!-- <Select>
            <Option disabled>Select</Option>
            <Option>Audi</Option>
          </Select> -->
          <!-- 
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
          </select>-->
        </div>
        <div class="form-group">
          <button type="submit" :disabled="!(meta.valid && meta.dirty)">
            Come back to first
          </button>
          <router-link to="login" class="btn btn-link">Cancel</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
