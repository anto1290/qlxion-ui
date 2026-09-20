<template>
  <component
    :is="as || 'button'"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-disabled="(disabled || loading) ? true : undefined"
    v-bind="restAttrs"
    ref="rootEl"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRefs } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => [
      'default',
      'destructive',
      'outline',
      'ghost',
      'link',
    ].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'icon'].includes(v),
  },
  disabled: Boolean,
  loading: Boolean,
  as: String,
});

const { variant, size, disabled, loading, as, ...rest } = toRefs(props);
const rootEl = ref<HTMLElement | null>(null);

function buttonVariants(variant: string, size: string) {
  // This must match the cva config in core-react/src/button/button.tsx EXACTLY
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizes = {
    md: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  };
  // Map default <-> md to match React
  const v = variants[variant as keyof typeof variants] || variants.default;
  const s = sizes[size as keyof typeof sizes] || sizes.md;
  return [base, v, s].join(' ');
}

const buttonClasses = computed(() =>
  buttonVariants(props.variant, props.size)
);

const restAttrs = computed(() => {
  // Only forward attrs not declared as props
  const declared = ['variant', 'size', 'disabled', 'loading', 'as'];
  const out: Record<string, any> = {};
  for (const key in props) {
    if (!declared.includes(key)) {
      out[key] = (props as any)[key];
    }
  }
  return out;
});
</script>
