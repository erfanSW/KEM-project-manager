export default {
   data() {
     return {
       stringOptions: ["it", "علمی", "تخیلی"],
       filterOptions: ["it", "علمی", "تخمی"],
     };
   },
   methods: {
     createValue(val, done) {
       if (val.length > 0) {
         if (!this.stringOptions.includes(val)) {
           this.stringOptions.push(val);
         }
         done(val, "toggle");
       }
     },

     filterFn(val, update) {
       update(() => {
         if (val === "") {
           this.filterOptions = this.stringOptions;
         } else {
           const needle = val.toLowerCase();
           this.filterOptions = this.stringOptions.filter(
             v => v.toLowerCase().indexOf(needle) > -1
           );
         }
       });
     },
   }
}
