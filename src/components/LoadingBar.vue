<template>
    <div class="progress-spinner">
      <ProgressSpinner aria-label="Loading" />
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.progress-spinner {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: progress;
    z-index: 777;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>