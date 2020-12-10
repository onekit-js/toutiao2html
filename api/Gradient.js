
export   class Gradient{
      constructor() {
          this.colorStops = [];
      }

      addColorStop(stop, color) {
          this.colorStops.push([
              stop,
              color

          ]);
          return this;
      }
  }
