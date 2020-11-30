$.cookie.json = true;
var cmt=JSON.parse(localStorage.getItem('cusacklab_mturk'));	
var cmt_debriefresults=$.cookie('cusacklab_mturk_debrief');	
var cmt_imageryresults=$.cookie('cusacklab_mturk_imagery');	

function sortWithIndices(toSort) {
  for (var i = 0; i < toSort.length; i++) {
	toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
	return left[0] < right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
	toSort.sortIndices.push(toSort[j][1]);
	toSort[j] = toSort[j][0];
  }
  return toSort;
}

function cmtNextSection(oldSection,newSection) {
	$("#"+oldSection).hide();
	$("#"+newSection).show();	
};

function cmtWriteCookies() {
	localStorage.setItem('cusacklab_mturk',JSON.stringify(cmt));
	$.cookie('cusacklab_mturk_debrief',cmt_debriefresults);
	$.cookie('cusacklab_mturk_imagery',cmt_imageryresults);
};

function cmtNextPage() {
	cmt.pagescompleted.push=cmt.pageroot+cmt.pagesuffixlist[cmt.currentpage];
	cmt.currentpage=cmt.currentpage+1;
	cmtNextPage(cmt.currentpage);
};
	
function cmtNextPage(nextpage) {
	cmtWriteCookies();
	newhref=cmt.pageroot+cmt.pagesuffixlist[nextpage] + '.html';
	window.location.href=newhref;
};

function cmtReloadPage() {
	cmt.pagescompleted.push=cmt.pageroot+cmt.pagesuffixlist[cmt.currentpage];
	cmtWriteCookies();
	window.location.href=cmt.pageroot+cmt.pagesuffixlist[cmt.currentpage] + '.html';
};


String.prototype.hashCode = function(){
	var hash = 0, i, char;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	hash=Math.abs(hash);
	return hash;
};

	
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
	return "";
  else
	return decodeURIComponent(results[1].replace(/\+/g, " "));
}    

function makeid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
