<template lang="html">
  <div>

    <div v-if="editMode || !csvText || !contentValidates">
      <textarea
        placeholder="Klistra in CSV"
        v-model="csvText"
        @blur = "editMode = false"
        @focus = "editMode = true"></textarea>

        <div class="manus">
          <h2>{Nbr}</h2>
          <p>{HintBefore}</p>
          <p class="muted">{Song}</p>
          <p class="mb">{HintAfter}</p>
          <p class="small muted">{Pos}, {Len} bokstäver - {Answer}</p>
        </div>
    </div>

    <div v-else>
      <span
        class="btn"
        @click="editMode = true"
      >Redigera</span>&nbsp;
      <span
        class="btn"
        @click="csvText = '', editMode = true"
      >Rensa</span>

      <div class="manus" v-if="csvText">
        <div v-for="(row,i) in contentArray" :key="i">
          <hr v-if="row.Nbr && i" />
          <h2 v-if="row.Nbr" >{{row.Nbr}}</h2>
          <p v-if="row.HintBefore">{{row.HintBefore}}</p>
          <p v-if="row.Song" class="muted">{{row.Song}}</p>
          <p v-if="row.HintAfter" class="mb">{{row.HintAfter}}</p>
          <p v-if="row.Pos" class="muted">{{row.Pos}}, {{row.Len}} bokstäver - {{row.Answer.toUpperCase()}}</p>
          <p v-if="row.Comment" class="small muted">{{row.Comment}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScriptGenerator",
  data() {
    let storedText
    if (localStorage.getItem('script-csvText')) {
      storedText = JSON.parse(localStorage.getItem('script-csvText'))
    }
    return {
      csvText: storedText || undefined,
      editMode: !(storedText)
    }
  },
  watch: {
    csvText() {
      localStorage.setItem('script-csvText', JSON.stringify(this.csvText));
    }
  },
  computed: {
    csvArray() {
      // ref: http://stackoverflow.com/a/1293163/2343
      // This will parse a delimited string into an array of
      // arrays. The default delimiter is the comma, but this
      // can be overriden in the second argument.
      function CSVToArray( strData, strDelimiter ){
          // Check to see if the delimiter is defined. If not,
          // then default to comma.
          strDelimiter = (strDelimiter || ",");

          // Create a regular expression to parse the CSV values.
          var objPattern = new RegExp(
              (
                  // Delimiters.
                  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                  // Quoted fields.
                  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                  // Standard fields.
                  "([^\"\\" + strDelimiter + "\\r\\n]*))"
              ),
              "gi"
              );


          // Create an array to hold our data. Give the array
          // a default empty first row.
          var arrData = [[]];

          // Create an array to hold our individual pattern
          // matching groups.
          var arrMatches = null;

          // Keep looping over the regular expression matches
          // until we can no longer find a match.
          while (arrMatches = objPattern.exec( strData )){ // eslint-disable-line no-cond-assign

              // Get the delimiter that was found.
              var strMatchedDelimiter = arrMatches[ 1 ];

              // Check to see if the given delimiter has a length
              // (is not the start of string) and if it matches
              // field delimiter. If id does not, then we know
              // that this delimiter is a row delimiter.
              if (
                  strMatchedDelimiter.length &&
                  strMatchedDelimiter !== strDelimiter
                  ){

                  // Since we have reached a new row of data,
                  // add an empty row to our data array.
                  arrData.push( [] );

              }

              var strMatchedValue;

              // Now that we have our delimiter out of the way,
              // let's check to see which kind of value we
              // captured (quoted or unquoted).
              if (arrMatches[ 2 ]){

                  // We found a quoted value. When we capture
                  // this value, unescape any double quotes.
                  strMatchedValue = arrMatches[ 2 ].replace(
                      new RegExp( "\"\"", "g" ),
                      "\""
                      );

              } else {

                  // We found a non-quoted value.
                  strMatchedValue = arrMatches[ 3 ];

              }


              // Now that we have our value string, let's add
              // it to the data array.
              arrData[ arrData.length - 1 ].push( strMatchedValue );
          }

          // Return the parsed data.
          return( arrData );
      }

      return CSVToArray(this.csvText, '\t')
    },
    contentArray() {
      let keys = this.csvArray[0]

      let outputArray = []
      this.csvArray.forEach((item, j) => {
        if (j === 0)
          return
        let itemObject = {}
        keys.forEach((key, i) => {
          itemObject[key] = item[i]
        });
        outputArray.push(itemObject)
      });

      return outputArray;
    },
    contentValidates() {
      let keys = this.csvArray[0]
      return keys.indexOf('Nbr') !== -1 &&
        keys.indexOf('HintBefore') !== -1 &&
        keys.indexOf('Song') !== -1 &&
        keys.indexOf('HintAfter') !== -1 &&
        keys.indexOf('Pos') !== -1
    }
  }

}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}

textarea {
  -webkit-appearance: none;
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-radius: 0;

  border: calc(var(--borderWidth) * 2) solid var(--clr-fg);
  background: LIGHTCYAN;
  color: var(--clr-fg);

  font: inherit;
  width: 90vw;
  max-width: 50rem;
  height: 75vh;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  outline: none;
  padding: .5rem;

  transition: height 0.5s ease;
}
textarea::selection {
  background: var(--clr-fg);
  color: var(--clr-bg);
}
textarea.filled:focus {
  height: 15rem;
}
textarea.filled {
  height: 3rem;
}

.manus {
  width: 33rem;
  font-size: 1.414rem;
  line-height: 2rem;
  text-align: left;
  margin: 0 auto 10rem;
}
.manus h2 {
  margin-top: 3rem;
}
.manus p {
  margin: 1rem 0;
}
.manus p.mb {
  margin-bottom: 2rem;
}
.manus hr {
  border: none;
  border-top: 1px solid var(--clr-fg);
  margin: 3rem 0;
}
.muted {
  opacity: 0.5;
  font-style: italic;
  padding-left: 3rem;
}
.manus p.small {
  margin-top: -0.5rem;
  font-size: 0.8em;
  line-height: 1em;
}
</style>
