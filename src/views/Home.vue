<template>
  <v-layout row wrap="" align-content-start>
    <v-flex xs12>
      <copy-file/>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import CopyFile from "@/components/CopyFile.vue";

export default {
  name: "home",
  components: {
    CopyFile
  }
};
</script>
