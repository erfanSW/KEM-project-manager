<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/undraw_page_not_found_su7k.svg"
        style="width:90vw;max-width:350px;"
      >
    </p>
    <p class="text-faded">متاسفم صفحه یافت نشد :(</p>
    <q-btn
      color="indigo-5"
      dense
      style="width:200px;height: 30px"
      to="/"
      label="به عقب بازگرد"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
