var itemList={"sp001":{"name":"Bánh AFC","price":50000,"photo":"images/AFC.webp"},
"sp002":{"name":"Bánh BON","price":60000,"photo":"images/BON.webp"},
"sp003":{"name":"Bánh Chocopie","price":50000,"photo":"images/chocopie.webp"},
"sp004":{"name":"Bánh BON Trứng Muối","price":70000,"photo":"images/BONBIG.webp"},
"sp005":{"name":"Bánh Quy COSY","price":50000,"photo":"images/COSY.webp"},
"sp006":{"name":"Bánh Quy COSY socola","price":50000,"photo":"images/COSYCHOCOLAT.webp"},
"sp007":{"name":"Bánh Dừa Nướng","price":40000,"photo":"images/DUANUON.webp"},
"sp008":{"name":"Pocky","price":50000,"photo":"images/Pocky.webp"},
"sp009":{"name":"Bánh solite","price":50000,"photo":"images/Solite.webp"},
};
/*them sp vao gio hang**/
function addCart(code)
{
    var number=parseInt(document.getElementById(code).value);
    var name=itemList[code].name;
    if(number==0) return;
    if(typeof localStorage[code]==="undefined"){
        window.localStorage.setItem(code,number);
    }else{
        var current=parseInt(window.localStorage.getItem(code));
        if(current+number>100)
        {
            window.localStorage.setItem(code,100);
            alert("Mỗi mặt hàng chỉ có thể đặt 100 sp cho mỗi đơn hàng. Bạn đã đặt 100 sp của "+name+" này.");
            return;
        }
        else
        window.localStorage.setItem(code,current+number);
    }
    alert("Đã cặp nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");
}
/*ham mo trang gio hang**/
function openCart()
{
    window.location.href="donhang.html";
}
function getDiscountRate()
{
    var d=new Date();
    var weekday=d.getDate();
    var totalMins=d.getHours()*60+d.getMinutes();
    if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
    return 0.1;
    return 0;
}
/*ham hien thi nd gio hang**/
function showCart()
{
    var formatter = new Intl.NumberFormat('vi-VN',{
        style: 'currency',
        currency:'VND'
    });
    var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
container.innerHTML="";
    var sum=0;
    var totalPreTax=0;
    var discountRate=getDiscountRate();
    var taxRate=0.1;
    var discount=0;
    var tax=0;
    for(var i=0;i<window.localStorage.length;i++)
    {
        if(typeof itemList[localStorage.key(i)]==="undefined")
        continue;
        var tr=document.createElement("tr");
        var photoCell=document.createElement("td");
        var nameCell=document.createElement("td");
        var priceCell=document.createElement("td");
        var numberCell=document.createElement("td");
        var sumCell=document.createElement("td");
        var removeCell=document.createElement("td");
        var removeLink=document.createElement("a");
        var item=itemList[localStorage.key(i)];
        var number=localStorage.getItem(localStorage.key(i));
        photoCell.style.textAlign="center";
        photoCell.innerHTML="<img src='"+item.photo+"' class='round-figure' width='100px'/>";
        nameCell.innerHTML=item.name;
        priceCell.innerHTML=formatter.format(item.price);
        priceCell.style.textAlign="right";
        numberCell.innerHTML=number;
        numberCell.style.textAlign="right";
        sum=number*item.price;
        sumCell.innerHTML=formatter.format(sum) 
        sumCell.style.textAlign="right";
        removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
        removeLink.setAttribute("href","#");
        removeLink.setAttribute("data-code",localStorage.key(i));
        removeLink.onclick=function(){
            removeCart(this.dataset.code);
        };
        removeCell.style.textAlign="center";
        removeCell.appendChild(removeLink);
        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell);
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(removeCell);
        container.appendChild(tr);
        totalPreTax+=sum;
    }
    var discount=totalPreTax*discountRate;
    var tax=(totalPreTax-discount)*taxRate;
    document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);
    document.getElementById("bill_discount").innerHTML=discountRate+" x A = "+formatter.format(discount);
    document.getElementById("bil_tax").innerHTML=formatter.format(tax);
    document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax);
}
function removeCart(code)
{
    if(typeof window.localStorage[code]!=="undefined")
    {
        window.localStorage.removeItem(code);
        document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
        showCart();
    }
}