import React, { PureComponent } from "react";
import { lang } from "../../configs/lang";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import XLSX from "xlsx";
import { saveQuestionData } from "../../actions/index";

class ImportQuestion extends PureComponent {
  static propTypes = {
    onUploadFile: PropTypes.func,
    saveQuestionData: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string
  };

  saveDataQuestion = () => {
    const { id } = this.props;
    const processExcel = data => {
      var workbook = XLSX.read(data, {
        type: "binary"
      });
      var worksheet = workbook.SheetNames;
      var worksheetLength = worksheet.length;
      var datas = [];
      for (var i = 0; i < worksheetLength; i++) {
        var sheetName = workbook.SheetNames[i];
        var obj = {};
        var excelRows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        obj.groupQuestionName = sheetName;
        obj.listQuestion = excelRows;
        datas.push(obj);
      }
      localStorage.removeItem(id);
      localStorage.setItem(id, JSON.stringify(datas));
      const resultData = {};
      resultData[id] = datas;
      this.props.saveQuestionData(resultData);
    };

    var fileUpload = document.getElementById(id);
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof FileReader != "undefined") {
        var reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = function(e) {
            processExcel(e.target.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        } else {
          //For IE Browser.
          reader.onload = function(e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            processExcel(data);
          };
          reader.readAsArrayBuffer(fileUpload.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert(lang.alertInCorrectFormat);
    }
  };

  render() {
    const { title, id } = this.props;
    return (
      <div className="box-block-border">
        <h4 className="mb-10">{title}</h4>
        <div>
          <input type="file" id={id} />
        </div>
        <div className="mt-10">
          <input
            type="button"
            id="upload"
            value={lang.save}
            onClick={this.saveDataQuestion}
            className="btn sky"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  saveQuestionData
};

export default connect(
  null,
  mapDispatchToProps
)(ImportQuestion);
