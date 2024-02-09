
// assuming given data is fetch from database
const masterdata = [
  {
    unit: 1,
    price_type: "Standard Price",
    off_value: 10,
    discount_price: 10.0,
    original_price: 24.0,
    tag: "",
  },
  {
    unit: 2,
    price_type: "Standard Price",
    off_value: 20,
    discount_price: 18.0,
    original_price: 24.0,
    tag: "MOST POPULAR",
  },
  {
    unit: 3,
    price_type: "Standard Price",
    off_value: 30,
    discount_price: 24.0,
    original_price: 24.0,
    tag: "",
  },
];


// map over masterdata to display content

document.addEventListener("DOMContentLoaded", function () {
  const totalSpan = document.getElementById("total");

  const selectedPrice = masterdata
    .find((item) => item.unit == 2)
    .discount_price.toFixed(2);
  totalSpan.textContent = `$${selectedPrice} USD`;

  const formContainer = document.getElementById("loadcontent");
  
  masterdata.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add(data.unit==2?"border-active":"border");
    div.setAttribute('id', `dynamic-border_${data.unit}`)
    div.innerHTML = `
    <div class='rectangle-parent ' >
    ${data.tag!==""? `
    <div class='rectangle'></div>
    <button class="frame-button">
    <div class="frame-child11"></div>
    <b class="most-popular">${data.tag}</b>
  </button>`:""}
    
    <div class="frame-container">
      <div class="frame-wrapper">
      <input type="radio" id="unit_${data.unit}" name="unit" value="${
      data.unit
    }" ${data.unit === 2 ? "checked" : ""}>
      </div>
      <div class="frame-div">
        <div class="unit-parent">
          <div class="unit">${data.unit} Unit</div>  
          <div class="rectangle-group">
            <div class="frame-child2"></div>
            <div class="off">${data.off_value}% Off</div>
          </div>
        </div>
        <div class="standard-price">${data.price_type}</div>
      </div>
    </div>
    <div class="coloured-frames">
      <div class="usd">$${data.discount_price.toFixed(2)} USD</div>
      <div class="usd1">$${data.original_price.toFixed(2)} USD</div>
    </div>


    </div>
    </div>
<div class='mt-3' id="dynamic-content_${data.unit}" ${
      data.unit === 2 ? "" : 'style="display: none;"'
    }>
<div>
<table>
  <thead>
    <tr>
      <th></th>
      <th class='size'>Size</th>
      <th class='size'>Color</th>
    </tr>
  </thead>
  <tbody>
  ${generateTableRows(data.unit)}
 
  </tbody>
</table>
</div>
</div>



  `;
    formContainer.appendChild(div);
  });
});



// listening to change on event  of radio button
document.getElementById("formitem").addEventListener("change", function () {
  try {
    
  
  // selecting total element to display price based on selection of radio button
  const totalSpan = document.getElementById("total");

  // selecting all element having id dymanic_content_ to hide by default
  const dynamicContentElements = document.querySelectorAll('[id^="dynamic-content_"]');

  dynamicContentElements.forEach((element) => {element.style.display = "none"});

  const dynamic_border=document.querySelectorAll(`[id^="dynamic-border_"]`)

  dynamic_border.forEach((element) => {element.style.border='0.9px solid var(--color-gainsboro-200)'});
  dynamic_border.forEach((element) => {element.style.background="white"});


  var selectedOption = document.querySelector('input[name="unit"]:checked').value;

  const dynamic_border_content = document.getElementById(
    `dynamic-border_${selectedOption}`
  );

  if(dynamic_border_content){
      dynamic_border_content.style.border='2px solid var(--color-lightcoral)'
      dynamic_border_content.style.background="#fff9fa"
  }

  const selectedPrice = masterdata
    .find((item) => item.unit == selectedOption)
    .discount_price.toFixed(2);
  
    //assigning total value 
  totalSpan.textContent = `$${selectedPrice} USD`;

  // select dynamic content
  const dynamicContent = document.getElementById(
    `dynamic-content_${selectedOption}`
  );

  // show dynamic content
  if (dynamicContent) {
    dynamicContent.style.display = "block";
  }
} catch (error) {
 console.log(error);   
}
});


// generating dynamic unit selection based on no of unit
function generateTableRows(unit) {
  let rows = "";
  for (let i = 1; i <= unit; i++) {
    rows += `
      <tr>
        <td class='div'>#${i}</td>
        <td>
          <select id="selectSize_${unit}_${i}">
            <option value="small" >Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </td>
        <td>
          <select  id="selectColor_${unit}_${i}">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </td>
      </tr>`;
  }
  return rows;
}


