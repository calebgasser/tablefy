module.exports = class Tablefy{
  constructor(){
    this.headers = [];
    this.rows = [];
    this.dividerVert = '|';
    this.dividerHorzHeader = '=';
    this.dividerHorzRow = '-'
    this.output = '';
  }
  draw(query){
    if(query && query.length){
      this.setHeaders(query);
      this.setRows(query);
      this.render();
    } else {
      console.log('Empty results were passed to tbfy');
    }
  }
  setHeaders(query){
    this.headers = Object.keys(query[0]);
  }
  setRows(query){
    for(let row in query){
      this.rows.push(Object.values(query[row]));
    }
    for(let row in this.rows){
      this.rows[row] = this.rows[row].map(String);
    }
  }
  getColumnMaxLength(col){
    let maxLength = this.headers[col].length;
    for(let row in this.rows){
      if(this.rows[row][col].length > maxLength){
        maxLength = this.rows[row][col].length;
      }
    }
    return maxLength;
  }
  render(){
    this.renderHeader();
    console.log(this.output);
  }
  renderHeader(){
    let output = this.dividerVert;
    let headerDivider = '';
    for(let head in this.headers){
      output = output.concat(this.headers[head]);
      if(this.headers[head].length < this.getColumnMaxLength(head)){
        for(let i = 0; i < (this.getColumnMaxLength(head) - this.headers[head].length); i++){
          output = output.concat(' ');
        }
      }
      output = output.concat(this.dividerVert);
    }
    for(let i = 0; i < output.length; i++ ){
      headerDivider = headerDivider.concat(this.dividerHorzHeader);
    }
    this.output = headerDivider.concat('\n' + output + '\n' + headerDivider);
    this.renderRows();
    this.output = this.output.concat(headerDivider);
  }
  renderRows(){
    let output = '\n';
    for(let row in this.rows){
      output = output.concat(this.dividerVert);
      for(let item in this.rows[row]){
        output = output.concat(this.rows[row][item]);
        if(this.rows[row][item].length < this.getColumnMaxLength(item)){
          for(let i = 0; i < (this.getColumnMaxLength(item) - this.rows[row][item].length); i++){
            output = output.concat(' ');
          }
        }
        output = output.concat(this.dividerVert);
      }
      output = output.concat('\n');
    }
    this.output = this.output.concat(output);
  }
}
