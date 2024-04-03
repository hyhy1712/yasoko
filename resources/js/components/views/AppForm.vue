<template>
    <a-form
        :model="formData"
    >
        <div class="row">
            <div :class="classWrapperFormItem">
                <a-form-item
                    v-for="(field,index) in fields"
                    :key="index"
                    :name="field.key"
                    :validateStatus="errors[field.key] ? 'error' : undefined"
                    :help="errors[field.key] ?? undefined"
                    :class="classFormItem"
                >
                    <span>{{ field.name }}<span class="text-danger" v-if="field.required">*</span></span>
                    <app-input
                        v-model="formData[field.key]"
                        :type="field.type"
                        :options="field.options ?? []"
                        :entity="field.entity ?? null"
                        :multiple="field.multiple ?? false"
                        :disabled="field.disabled ?? false"
                    >
                    </app-input>
                </a-form-item>
            </div>
        </div>

        <slot name="more-field" :formData="formData"></slot>

        <div class="d-flex justify-content-center">
            <button-save @click="submit"></button-save>
            <button-cancel @click="cancel"></button-cancel>
        </div>

    </a-form>
</template>

<script setup>
import {ref} from "vue";
import AppInput from "@/components/inputs/AppInput.vue";
import ButtonCancel from "@/components/buttons/ButtonCancel.vue";
import ButtonSave from "@/components/buttons/ButtonSave.vue";
import {isEmptyObject, isset} from "@/helpers/CommonHelper.js";

const props = defineProps({
    fields: {
        type: Array,
        default: []
    },
    sourceData: {
        type: Object,
        default: {}
    },
    errors: {
        type: Object,
        default: {}
    },
    classWrapperFormItem: {
        type: String,
        default: ''
    },
    classFormItem: {
        type: String,
        default: ''
    },
    submit: {
        type: Function,
        required: true
    },
    cancel: {
        type: Function,
        default: null
    },
});
//If is empty props.sourceData => create record, formData = {} will not save old formData when create another record
//If not empty props.sourceData => update record
const formData = ref(props.sourceData);
if (isEmptyObject(props.sourceData)) {
    formData.value = ref({});
}

const setDefaultValue = () => {
    props.fields.forEach(field => {
        if (isset(field.default_value)) {
            formData.value[field.key] = field.default_value;
        }
    });
}
setDefaultValue();

const submit = () => {
    const data = props.fields.reduce((result, field) => {
        if (!field.disabled && formData.value.hasOwnProperty(field.key)) {
            result[field.key] = formData.value[field.key];
        }
        return result;
    }, {});

    props.submit(data);
}

const cancel = () => {
    props.cancel();
}
</script>
