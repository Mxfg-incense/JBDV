<script >
export default {
  data() {
    return {
      options: [
        { value: 'option1', label: '信息网络' },
        { value: 'option2', label: '危险驾驶' },
        { value: 'option3', label: '寻衅滋事' }
      ],
      selectedOption: 'option1'
    };
  }
};
</script>

<template>
  <div>
    <p style="color: black;">案件类型</p>
  </div>
  <select v-model="selectedOption" @change="$emit('changeOption', selectedOption)">
    
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
<style scoped lang="scss">
.p{
  color: black;

}
select{
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  padding: 0 5px;
  font-size: 14px;
  color: #666;

}
</style>
