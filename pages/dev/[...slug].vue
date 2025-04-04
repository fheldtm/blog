<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <PostDetail :doc="doc" />
    </ContentDoc>
  </main>
</template>
