<template>
  <div class="image-placeholder" :style="styles">
    <span class="placeholder-text">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: {
    type: [Number, String],
    default: '100%'
  },
  height: {
    type: [Number, String],
    default: '200px'
  },
  text: {
    type: String,
    default: '图片加载中...'
  },
  backgroundColor: {
    type: String,
    default: '#3498db'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  fontSize: {
    type: [Number, String],
    default: '16px'
  },
  borderRadius: {
    type: [Number, String],
    default: '4px'
  }
});

const styles = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    backgroundColor: props.backgroundColor,
    color: props.textColor,
    fontSize: typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize,
    borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius
  };
});
</script>

<style scoped>
.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.placeholder-text {
  padding: 15px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style> 