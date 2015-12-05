'use strict';

angular.module('loyoApp')
.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 95;   // always scroll by 50 extra pixels
}])
.controller('NewZealandPage1', function($scope, $sce, search) {
  $scope.isCollapsed = true;
  $scope.feature = $sce.trustAsHtml('<img src="app/NewZealand/images/00002042.jpg" style="width: 100%;">');
  $scope.specialize = $sce.trustAsHtml('<img src="app/NewZealand/images/00002040.png" style="width: 100%;">'+
                                       '<img src="app/NewZealand/images/00002041.gif" style="width: 100%;">'+
                                       '<div class="col-md-12">'+
                                       '<p><span style="color: #b22222"><span style="font-size: 16px"><strong>美食餐廳一覽- (食/景共享) 餐食再升級，安排多樣化異國風味及美食主題餐廳</strong></span></span><br><span style="color: #696969"><span style="font-size: 16px">【基督城】飯店高級西式晚餐,高級食材主廚精心烹調美食<br>【農莊】小伴手禮拜訪,住宿農,品嘗農莊主人熱情款宴家常晚餐<br>【蒂卡波湖】特選高級冰河水飼養鮭魚、鯛魚、野鹿、天婦羅日式定食午餐, 觀賞湖景<br>【庫克山】隱士飯店高級景觀餐廳晚餐,紐西蘭金獎主廚精選食材,菜色豐富美味,挑戰胃蕾</span></span><br><span style="color: #ff00ff"><span style="font-size: 16px">(安排每人一杯紅.白葡萄酒或非酒精飲料佐餐)</span></span><br><span style="color: #696969"><span style="font-size: 16px">【麥肯奇飯店】紐式風味BBQ -牛排、羊排、豬排、福氣魚、沙拉、果凍、冰淇淋、咖啡or茶<br>【瓦納卡】 湖濱美食餐廳西式晚餐-南阿爾卑斯山美景、湖光山色、黃昏美景<br>【瓦納卡】湖濱飯店西式套餐晚餐-主廚推薦特選牛排或鮭魚排,景色優美,遊閑自在瓦納卡</span></span><br><span style="color: #ff00ff"><span style="font-size: 16px">(安排每人一杯紅.白葡萄酒或非酒精飲料佐餐)</span></span><br><span style="color: #696969"><span style="font-size: 16px">【箭鎮】The stable古蹟建築◎馬廄餐廳享用午餐，懷古的歷史建築物,優美閑情雅緻環境<br>【蒂阿瑙】中式合菜美味龍蝦餐，美味可口小羊肉、鹿肉、豬蹄、蒸藍雕魚+葱薑峽灣龍蝦<br>【皇后鎮】英國戰船主題餐廳西式套餐晚餐,環境氣氛佳,高級食材主廚烹調,風味絕佳</span></span><br><span style="color: #ff00ff"><span style="font-size: 16px">(安排每人一杯紅.白葡萄酒或非酒精飲料佐餐)</span></span><br><span style="color: #696969"><span style="font-size: 16px">【皇后鎮】包伯峰山頂豪華自助餐餐-俯瞰瓦卡第普湖世界級景觀<br>【皇后鎮】著名的義大利餐廳,品嚐義大利PIZZA套餐,餐廳位於鎮上,方便晚餐後湖邊悠閒逛街或散步<br>【奧克蘭】飯店高級西式晚餐,高級食材主廚精心烹調美食<br>【奧克蘭】高級高級食材主廚精心烹調美食中式惜別午宴</span></span><br><span style="color: #ff00ff"><span style="font-size: 16px">(安排每人一杯紅.白葡萄酒或非酒精飲料佐餐)</span></span></p>'+
                                       '<p><span style="font-size: 16px"><span style="color: #b22222"><strong>住宿飯店一覽 共9晚住宿-WANAKA/蒂阿瑙/皇后鎮兩晚住宿優質旅遊最重要的元素</strong></span><br><span style="color: #696969">【基督城】- IBIS飯店市中心，近大教堂廣場，飯店提供免費WIFI<br>【費利小鎮】(FARM STAY) 親切友善的農家主人熱情接待，體驗紐西蘭KIWI式的農家生活<br>【庫克山】隱士飯店 THE HERMITAGE 1晚 - 到訪紐西蘭必去的首選國寶級飯店(保證面庫克山房)<br>【瓦納卡】水岸湖濱渡假村EDGEWATER RESORT 2晚 - 旅客滿意度最高住宿飯店<br>【蒂阿瑙】LUXMORE DISDINCTION1晚-緊鄰湖畔，傍晚、清晨散步，欣賞湖光山色<br>【皇后鎮】Mellinum 2晚-臨近市中心、皇后鎮植物園<br>【奧克蘭】SKY CITY HOTEL天空之城飯店豪華西式自助餐廳，飽嚐由頂級廚師為各位貴賓所準備的美味佳餚</span></span></p>'+
                                       '</div>'+
                                       '<img src="app/NewZealand/images/00000566.gif" style="width: 100%;">'+
                                       '<img src="app/NewZealand/images/00000567.gif" style="width: 100%;">'+
                                       '<img src="app/NewZealand/images/00000569.gif" style="width: 100%;">'+
                                       '<img src="app/NewZealand/images/00000568.gif" style="width: 100%;">'+
                                       '<img src="app/NewZealand/images/00000851.gif" style="width: 100%;">'
                                      );
  $scope.details = [{
    date: '第 1 天',
    title: '台北/(轉機點)/基督城',
    context: $sce.trustAsHtml('<p>短暫離開平日生活、工作的空間，整裝待發到紐西蘭來一趟悠閒與樂活、OFF慢遊紐西蘭之旅。今日搭乘中華航空豪華噴射班機往紐西蘭南島一大城－基督城，今晚夜宿機上，班機於隔日下午抵達。</p><p>短暫離開平日生活、工作的空間，整裝待發到紐西蘭來一趟悠閒與樂活、OFF慢遊紐西蘭之旅。今日搭乘中華航空豪華噴射班機往紐西蘭南島一大城－基督城，今晚夜宿機上，班機於隔日下午抵達。</p><p><span style="font-size: 14px"><span style="color: #ff0000">【備註】</span><br><span style="color: #ff33ff">1).&nbsp;參加團體，中華航空有特惠價格升等商務客艙優惠專案，歡迎向業務人員洽辦。<br>2).&nbsp;歡迎台新無限卡會員升等商務客艙優惠專案，歡迎向業務人員洽辦。</span></span><br><br>&nbsp;</p>'),
    hotel: '夜宿機上',
    breakfast: '敬請自理',
    lunch: '敬請自理',
    dinner: '敬請自理'
  }, {
    date: '第 2 天',
    title: '基督城',
    context: $sce.trustAsHtml('<p>紐西蘭10月起至隔年3月底，是夏令節約時間，時間比台灣快5小時，抵達基督城後已是當地時間傍晚時分，慢遊行程不趕路的原則，晚餐在飯店內享用西式晚餐，不安排任何行程，讓貴賓充分休息，調整時差回復體力，準備隔天精彩活動。</p>'),
    slides: [{
      title: '夜晚基督城',
      src: 'app/NewZealand/images/00002029-1.jpg', 
    }, {
      title: '夜晚基督城',
      src: 'api/images/test/00002029-2.jpg'
    }, {
      title: '夜晚基督城',
      src: 'api/images/test/00002029-3.jpg'
    }],
    hotel: 'IBISHOTEL或同級',
    breakfast: '機上精緻簡餐',
    lunch: '機上精緻簡餐',
    dinner: '飯店內高級西式套餐'
  }, {
    date: '第 3 天',
    title: '基督城-基督城市區巡禮-植物園-坎特伯里博物館-農莊住宿體驗',
    context: $sce.trustAsHtml('<p>2011基督城地震後，市中心整建中，主要景點值得造訪參觀。早餐專車在▲市中心的觀賞基督城市容現況(開車經過)，整建中的基督城大教堂、大教堂廣場、亞芳河、紙板教堂。隨後下午安排前往◎植物園參觀 ，有很多超過百歲的巨樹，以及優美的園藝花卉讓您目不轉睛的欣賞。夏天到秋天，眾多植物持續開花，植物園景觀生機洋溢、多姿多采。安排★坎特伯里博物館參觀，在館中可觀賞到毛利人早期生活的方式，雕刻、編織等文物及窺見老19世紀基督城老街及交通工具的文明風貌，也可一次飽覽紐西蘭特有的奇異鳥、企鵝、信天翁各種的珍奇鳥類動物。</p> <p>午餐後經前往坎特伯里前往費利小鎮，特別企劃■安排★農莊住宿體驗。團體分組4~6人各自前往農莊，由當地農莊主人招待，實地參觀農場、近距離與飼養的動物合影，每個農莊住宅都有不同的居家特色，每位農莊主人都具備各自的興趣、嗜好，也都很好客、健談。晚餐主人準備紐西蘭式的家常美食招待。(可準備一份小禮物，贈送農莊主人，增加互動機會及建立更多情誼)，請前一天準備過夜簡單手提行李，夜宿農莊。</p><p><span style="font-size: 14px"><span style="color: #ff0000">【企劃語錄】</span><br><span style="color: #696969">&nbsp;</span><span style="color: #0066ff">難忘的農莊住宿體驗，深受到旅客的喜歡，能親身與好客、友善的紐西蘭人實地交流及親身造訪農莊、許多的飼養動物及廣大的牧場，強力推薦您來體驗。</span></span><br>&nbsp;</p>'),
    slides: [{
      title: '基督城植物園',
      src: 'app/NewZealand/images/00002030-1.jpg'
    }, {
      title: '坎特伯里博物館',
      src: 'app/NewZealand/images/00002030-2.jpg'
    }, {
      title: '農莊住宿體驗',
      src: 'app/NewZealand/images/00002030-3.jpg'
    }],
    hotel: '農莊住宿體',
    breakfast: '飯店內用',
    lunch: '中式合菜',
    dinner: '農莊美食',
    quote: $sce.trustAsHtml('<p class="color-blue>難忘的農莊住宿體驗，深受到旅客的喜歡，能親身與好客、友善的紐西蘭人實地交流及親身造訪農莊、許多的飼養動物及廣大的牧場，強力推薦您來體驗。</p>')
  }, {
    date: '第 4 天',
    title: '農莊-蒂卡波湖-庫克山國家公園-冰河船奇之旅-隱士飯店面庫山房-庫克山觀星活動',
    context: $sce.trustAsHtml('<p>依依不捨的道別農莊主人，今日前往◎蒂卡波湖小鎮，蒂卡波湖獨特的土耳其藍色彩，夢幻般的色澤讓您嘆為觀止，來到湖邊的◎牧羊人教堂及◎牧羊犬紀念雕象拍影留念。午餐特選高級冰河水飼養鮭魚、鯛魚、野鹿、天婦羅日式定食午餐, 觀賞湖景。</p>' + 
            '<p>下午進入◎庫克山國家公園。您可以自費搭乘景觀直昇機觀賞冰河,人驚奇的直昇機高山觀景的飛行體驗。起飛後航道駛向南阿爾卑斯山脈,飛越高山，沿途欣賞壯麗的高山及冰河,降落在冰河源頭,可下飛機觸摸雪、拍照。</p>' +
            '<p>(如果多雲、下雨、高山風速過強，天氣狀況不佳下影響飛行安全時行程取消)</p>' + 
            '<p>(建議前一天視當日天氣狀況及不影響團體活動時間，領隊代為預定時間、當場付款)</p>'+
            '<p><a class="color-blue" href=http://www.helicopter.co.nz/mtcook.asp>官網聯結</a></p>'+
            '<p>晚餐後,安排特別企劃■★【庫克山觀星活動】,第一階段觀賞星空劇場,室內的劇場觀賞南半球的星空及浩瀚太空,讓您難忘。第二階段,搭乘巴士到空曠的地方以觀星高倍望眼鏡星賞賞浩瀚天空 !(如第二階段因天候取消,退費用紐幣NZ20)</p>' + 
            '<div class="responsive-video margin-bottom-30"><iframe width="854" height="480" src="https://www.youtube.com/embed/PywR0rTIDAM" frameborder="0" allowfullscreen></iframe></div>' +
            '<p><strong><span style="color: #ff0000"><span style="font-size: 14px">【企劃語錄】</span></span></strong><br><span style="color: #ff00ff"><span style="font-size: 14px">1).&nbsp;保證入住面庫克山房</span></span><br><span style="color: #0066ff"><span style="font-size: 14px">國寶級飯店 - 庫克山隱士飯店，樂遊旅行社安排保證入住面庫克山房，仿間有同業以較房價便宜的"面山房"魚目混珠，或如住不到以同級飯店代替。庫克山國家公園內，只有一家飯店，別無其他飯店，90-120公里以外才有其他飯店。</span></span><br><span style="color: #ff00ff"><span style="font-size: 14px">2).&nbsp;庫克山山區氣候變化大</span></span><br><span style="color: #0066ff"><span style="font-size: 14px">在下雨及天候不佳的情況下，冰河船活動因此取消，行程企劃抵達當天安排冰河船，如天候不佳取消，隔天早上尚有機會，預設行程安排一定要當天下午抵達庫克山、隔天10:30~11:00離開，有兩個大半天的充裕時間。下午2點左右進入庫克山國家公園、隔天中午離開，停留時間充足最大機率體驗冰河船探險（以應對瞬息萬變的庫克山山區氣候）</span></span><br><span style="color: #ff00ff"><span style="font-size: 14px">3).&nbsp;可能遇到的狀況說明</span></span><br><span style="color: #0066ff"><span style="font-size: 14px">狀況一：<br>當天順利搭乘冰河船，隔天早上不需早起，可安排弧克山谷1.5小時健行，11點鐘離開庫克山國家公園─蒂卡波湖午餐。<br>狀況二：<br>當天因天候不佳不能搭乘冰河船，若可訂隔天08:30或是09:30搭乘。隔天車程短，中、晚餐時間順延。<br>狀況三：<br>當天因天候不佳不能搭乘冰河船，且隔天早上時間的船班已客滿無法訂到。將另外訂四輪驅動車進入塔斯曼山谷觀賞冰河湖，也是一種有趣的體驗（費用同冰河船）。<br>狀況四：<br>如兩天天氣都不佳，無法搭乘冰河船或四輪驅動車。無法體驗敬請見諒，退費用紐幣105元。</span></span></p>'),
    slides: [{
      title: '蒂卡波湖小鎮',
      src: 'app/NewZealand/images/00002031-1.jpg'
    }, {
      title: '冰河船奇之旅',
      src: 'app/NewZealand/images/00002031-2.jpg'
    }, {
      title: '星空劇場',
      src: 'app/NewZealand/images/00002031-3.jpg'
    }],
    hotel: '隱士飯店<<面庫山房型>>',
    breakfast: '農莊早餐',
    lunch: '日式高級定食',
    dinner: '飯店內高級西式自助餐'
  }, {
    date: '第 5 天',
    title: '庫克山國家公園-(胡克山谷健行)-瓦納卡-迷宮世界-水岸渡假飯店(住2晚)',
    context: $sce.trustAsHtml('<p>早餐後，前一天如果已順利搭乘冰河船，早上(可)安排胡克山谷◎輕度健行，庫克山國家公園幾條著名及規劃完整的步道，欣賞穿雲峰山頭藹藹白雪及散佈山頭有如放射狀的大小冰川，在離情依依的心情，離開庫克山國家公園。</p><p> 午餐安排紐西蘭BBQ自助式午餐，午餐後經過著名8號景觀公路來到林地隘口觀賞自然風光。下午專車來到★WANAKA迷宮世界，是一處非常值得探訪、老少咸宜的地方，高大的◎瓦納卡斜塔傾斜53度，是最受歡迎拍照留念的地點。這裡有各種不同的精心花樣讓人迷惑于其中，來到WANAKA一定要到此一遊。令人驚奇的幻象房、雕刻錯覺畫廊、最精彩古羅馬風格廁所…置身於這個奇妙的迷宮世界會讓你在驚歎之餘渡過神奇而快樂的時光。</p><p> 隨後來到悠閒愜意氣氛濃厚LAKE WANAKA城鎮，位於湖光山色的瓦那卡湖畔。</p><p> 安排住宿湖瓦納卡水岸湖濱渡假村EDGEWATER RESORT連續數年客戶滿意調查最佳飯店，特別安排住宿兩晚。</p>'),
    slides: [{
      title: '胡克山谷輕度健行',
      src: 'app/NewZealand/images/00002032-1.jpg'
    }, {
      title: 'WANAKA迷宮世界',
      src: 'app/NewZealand/images/00002032-2.jpg'
    }, {
      title: '水岸湖濱渡假村',
      src: 'app/NewZealand/images/00002032-3.jpg'
    }],
    hotel: '水岸湖濱渡假村',
    breakfast: '飯店內用',
    lunch: '紐式BBQ',
    dinner: '飯店內高級西式套餐'
  }, {
    date: '第 6 天',
    title: '瓦納卡湖自行車輕鬆一日遊',
    context: $sce.trustAsHtml('<p>LATE MONING CALL的早晨，今日悠閒、風光明媚的WANAKA湖光山色，海拔約320公尺，面積 192平方公里是紐西蘭第四大湖，深度超過300公尺以上，冰河侵蝕形成一個U型山谷的冰河蝕湖。氣候乾燥少雨，是全紐西蘭陽光最充足的地區之一，此處可以眺望南阿爾卑斯山頭的白雪。 <p>■特別企劃：★自行車輕鬆一日遊，每人提供一輛高級越野自行車，(自行車的大小可依身高安排)，在山明水秀的WANAKA，沿著湖區規劃完整的OFF ROAD自行車道，時速5~10公里的閑情悠閒的在騎乘。</p> <p>早上沿著湖的東側面步道，帆船、沙灘、林地、眺望遠山，看到喜歡的景色可以停下拍照。午餐安排在鎮上，午餐後可在逛逛鎮上著名藝術家的藝廊、品嘗義大利式冰淇淋。(自行車活動在紐西蘭也是一種時尚的活動，深度欣賞WANAKA美景，熱情推薦)</p> <p>【戶外活動選項安排】</p> <p>風光明媚的WANAKA是紐西蘭進行戶外活動休閒、娛樂的最佳地點之一。在不影響團體活動下，下午自由活動時間的選項可自行參加自行車、步道健行等活動，以及悠閒的水上活動，航空娛樂如高空跳傘、自駕飛行體驗、虎娥戰鬥機等活動。連結參考</p>'),
    slides: [{
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002033-1.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002033-2.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002033-3.jpg'
    }],
    hotel: '水岸湖濱渡假村',
    breakfast: '飯店內用',
    lunch: '海鮮BBQ',
    dinner: 'WANAK主題西式套餐'
  }, {
    date: '第 7 天',
    title: '瓦納卡-參觀高空彈跳-探索箭鎮-蒂阿腦-螢火蟲生態之旅',
    context: $sce.trustAsHtml('<p>瓦納卡(55KM)-參觀高空彈跳-箭鎮(194KM)-蒂阿瑙</p> <p>早餐後專車前往◎卡瓦勞極吊橋，高空彈跳發源地，觀賞從43米處上縱身而下高空彈跳。(如欲體驗，應視個人健康、安全狀況參加、費用自理)</p> <p>一般旅行團只能在這裡短暫停留45分鐘到1小時，特別安排在鎮上古蹟建築◎馬廄餐廳享用午餐The Stables Restaurant，懷古的歷史建築物，岩石堆疊的外牆，內有發古幽情懷，在之優美閑情雅緻的環境下用餐開心。午餐後您可在鎮上優閒逛街鎮上建築物典雅，琳瑯滿目的精緻商店，在隱秘巷弄內的coffee shop，享用美味咖啡，自在得閑。</p> <p>下午沿南島第二大湖瓦卡蒂普湖（Lake Wakatipu）南下，進入南地省，沿路兩旁盡是綠油油草原及遍地綠意盎的農地、成群白綿羊，到達蒂阿納湖畔小鎮。晚餐後★安排螢火蟲生態之旅，搭船遊湖並參觀紐西蘭最大的◎活性鐘乳石洞，隨後換◎搭乘小舟進入螢火蟲洞，洞內奇境似滿天鑽石閃爍，令人驚歎不已。</p>'),
    slides: [{
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002034-1.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002034-2.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002034-3.jpg'
    }],
    hotel: 'DISTINCTION LUXMORE HOTEL',
    breakfast: '飯店內用',
    lunch: '馬廏餐廳西式料理',
    dinner: '中式合菜+龍蝦'
  }, {
    date: '第 8 天',
    title: '蒂阿瑙-米爾德福峽灣-(峽灣景觀飛機-費用已含)-皇后鎮-皇后鎮西式主題餐廳',
    context: $sce.trustAsHtml('<p><span style="font-size: 14px"><span style="color: #ff8c00">蒂阿瑙-119公里-米爾德福峽灣-119公里蒂阿瑙-178公里皇后鎮</span><br><span style="color: #696969">今天進入湖光山景世界遺產</span><span style="color: #0066ff">■米佛峽灣自然保護區(1986年世界遺產)。</span><span style="color: #696969">從蒂阿瑙到米佛峽灣有一條119公里長的◎米佛景觀大道(Mildford Road)，沿途景色優美奇特，抵達米佛峽灣搭乘★米佛峽灣遊船巡遊深谷峽灣中，瀑布潺流、白雲悠悠，如詩如畫的景色令人激賞。在巡弋行程中有機會觀賞到特有的寒帶動物，如海豹、海豚、企鵝等。<br>推薦■搭乘7-11人座景觀飛機在高空中觀賞峽灣美景、高山湖泊、白雪靄靄的高山美景，高空觀賞紐西蘭最高的瀑布薩瑟蘭瀑布 580 米 (1,904 英尺) ，也可在高空欣賞蒂阿瑙、瓦卡蒂普湖的美景，</span><span style="color: #0066ff">景觀飛機米爾德福峽灣-峽灣-皇后鎮</span><span style="color: #696969">，約3點到達 ，專車巴士約5:30分到達皇后鎮，行李專車送往皇后鎮飯店。</span></span></p>'+
      '<p><span style="font-size: 14px"><span style="color: #ff0000"><strong>【企劃語錄】</strong></span><br><span style="color: #ff00ff">1).&nbsp;景觀飛機的安排目的是呈現峽灣美麗風光，並能省下300公里的拉車距離飛行時間約35分鐘<br>2).&nbsp;景觀飛機晴空才能搭乘，如遇天氣不佳取消退費紐幣NZ375，約台幣NT7800，搭巴士約05:30PM 到達皇后鎮飯店<br>3).&nbsp;如不適高空飛行的貴賓，請於出發前洽業務人員，退費台幣7800，搭巴士約05:30PM 到達皇后鎮飯店</span></span></p>'+
      '<p><span style="color: #ff8c00"><span style="font-size: 14px">特別安排皇后鎮高級飯店2晚，飯店地點離鬧區只需步行5分鐘，最能感受皇后鎮的美</span></span></p>' + 
        '<p><span style="font-size: 14px"><span style="color: #696969">今日特別安排★「皇后鎮西式主題餐廳」</span><span style="color: #ff00ff"> (安排每人一杯紅.白葡萄酒或非酒精飲料佐餐)</span><br><span style="color: #696969">特製餐前湯+大蒜麵包+冰淇淋甜點+COFEE or TEA<br>高山烤羊肩排/嫩燉小羊膝/鮮味蜜桃鹿排 /淡菜綠貝海鮮/橄欖油蒜味鮮蝦 (主菜5選一)</span></span></p>'),
    slides: [{
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002035-1.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002035-2.jpg'
    }, {
      title: 'WANAKA自行車輕鬆一日遊',
      src: 'app/NewZealand/images/00002035-3.jpg'
    }],
    hotel: 'Millennium Queenstown或同級',
    breakfast: '飯店內用',
    lunch: '遊艇自助餐',
    dinner: '皇后鎮主題餐廳西式套餐'
  }, {
    date: '第 9 天',
    title: '皇后鎮悠閒-包伯峰纜車-溜溜車-景觀餐廳-皇后鎮自由活動',
    context: $sce.trustAsHtml('<p><span style="font-size: 14px"><span style="color: #696969">今日NO MORNING CALL 的早晨，可以早起在湖邊散步、慢跑或睡到自然醒。早上10:30分集合後前往纜車站，乘坐纜車登上★【包伯峰觀湖+Luge溜溜斜坡車】，纜車登上後，乘第二段纜車，俯瞰瓦卡蒂普湖，並體驗Luge溜溜斜坡車 - 安全又帶著刺激的戶外活動。中午在包伯峰山頂享用豪華自助餐。</span></span></p>'+
      '<p><span style="font-size: 14px"><span style="color: #ff0000"><strong>【企劃語錄】</strong></span><br><span style="color: #0066ff">市場上多數行緊湊，長途車到達皇后鎮已是傍晚，匆忙搭纜車上山只能安排自助餐晚餐，無法安排Luge溜溜斜坡車，有些可惜，特別企劃白天日照時間纜車登上包伯峰。</span><br><span style="color: #696969">下午自由活動，您可以皇后鎮植物園裡散步、租借鐵馬或獨木舟（費用請自理）或在湖邊悠閒地慢遊；也可以輕鬆地在皇后鎮上的逛街，有許多的商店、藝廊都值得去逛逛。</span><span style="color: #0066ff">推薦您自費安排Jet boat噴射快艇，愛好刺激者的水上活動，在狹窄的山谷河道上快速奔馳，受過專業訓練的駕駛以高超技術能讓您體驗刺激有趣的樂趣。皇后鎮有3家JETBOAT公司，領隊為您說明給您最好的建議及安排。</span><br><span style="color: #696969">晚餐安排當地著名的義大利餐廳，品嚐義大利PIZZA套餐，餐廳位於鎮上，方便晚餐後再到湖邊悠閒逛街或散步。(2015-2016行程，不再安排皇后鎮大漢堡請見諒，如有疑問洽樂遊企畫部)</span></span><br>&nbsp;</p>'),
    slides: [{
      title: '包伯峰纜車',
      src: 'app/NewZealand/images/00002036-1.jpg'
    }, {
      title: 'Luge溜溜斜坡車',
      src: 'app/NewZealand/images/00002036-2.jpg'
    }, {
      title: '包伯峰山頂豪華自助餐',
      src: 'app/NewZealand/images/00002036-3.jpg'
    }],
    hotel: 'Millennium Queenstown或同級',
    breakfast: '飯店內用',
    lunch: '包伯峰豪華自助餐',
    dinner: '義大利PIZZA套餐'
  }, {
    date: '第 10 天',
    title: '皇后鎮/奧克蘭-凱利達頓海底世界-傳教士灣-高級住宅區-天空之塔觀景',
    context: $sce.trustAsHtml('<p><span style="color: #696969"><span style="font-size: 14px">今日搭乘國內班機前往北島奧克蘭，奧克蘭素有〞帆船之都〞美譽，位於奧克蘭半島南端的一條狹窄的地峽上，而被東側的懷特瑪塔和西側瑪努考兩大港灣所懷抱奧克蘭奇特的地形和溫暖的氣候，常被選為全世界前十城市之列。到達後安排市區觀光—高級住宅區、傳教士灣等風景名勝…等等，將奧克蘭港灣城市的風光一覽無遺。安排</span></span><span style="color: #0066ff"><span style="font-size: 14px">★凱利達頓海底世界</span></span><span style="color: #696969"><span style="font-size: 14px">，凱利達頓南極水族館內展出主題分<u>南極大陸及海底世界兩部份</u>。於南極大陸內可以親眼觀賞</span></span><span style="color: #b22222"><span style="font-size: 14px">國王企鵝</span></span><span style="color: #696969"><span style="font-size: 14px">和人造雪花；而海底世界則有一條海底隧道，可以近觀海底世界的景致，欣賞各式各樣當地的海底動物，如鯊魚、魟魚及其他五彩繽紛的魚類從你頭上游過，如在海底般。</span></span></p>'+
      '<p><span style="color: #696969"><span style="font-size: 14px">安排登上高★328公尺的奧克蘭天空塔─如同台灣的101地標，為全世界12高的建築物之一。由塔頂360度的瞭望台，延伸東西兩岸的全景盡收眼底。</span></span></p>'),
    slides: [{
      title: '凱利達頓海底世界',
      src: 'app/NewZealand/images/00002037-1.jpg'
    }, {
      title: '傳教士灣',
      src: 'app/NewZealand/images/00002037-2.jpg'
    }, {
      title: '奧克蘭天空塔',
      src: 'app/NewZealand/images/00002037-3.jpg'
    }],
    hotel: 'SKY CITY HOTEL或同級',
    breakfast: '飯店內用',
    lunch: '敬請自理',
    dinner: '飯店內用西式餐'
  }, {
    date: '第 11 天',
    title: '奧克蘭-遊艇港灣巡航-惜別豪華自助午餐-奧克蘭國際機場/(轉機點) /台北',
    context: $sce.trustAsHtml('<p><span style="font-size: 14px"><span style="color: #696969">特別企劃搭乘★【遊艇港灣巡航】將奧克蘭港灣城市的風光一覽無遺。遊艇在奧克蘭港灣行駛，也提供MORNING TEA，航程中觀賞南半球最大的帆船、遊艇碼頭、港灣燈塔，近距離觀賞◎Rangitototo火山、達文港金軍事基地，穿過奧克蘭地標◎奧克蘭大橋及市區觀光，飽覽奧克蘭港灣城市的風光。午餐特別安排朗廷五星飯店豪華海鮮自助餐，多樣豐富的海鮮佳餚，享受精湛讚廚藝的美食，隨後前往奧克蘭國際機場搭機經澳洲雪梨梨或布里斯本返回台北。</span></span></p>'),
    slides: [{
      title: '凱利達頓海底世界',
      src: 'app/NewZealand/images/00002038-1.jpg'
    }, {
      title: '傳教士灣',
      src: 'app/NewZealand/images/00002038-2.jpg'
    }, {
      title: '奧克蘭天空塔',
      src: 'app/NewZealand/images/00002038-3.jpg'
    }],
    hotel: 'SKY CITY HOTEL或同級',
    breakfast: '飯店內用',
    lunch: '敬請自理',
    dinner: '飯店內用西式餐'
  }, {
    date: '第 12 天',
    title: '台北',
    context: $sce.trustAsHtml('<p><span style="font-size: 14px"><span style="color: #696969">清晨抵達桃園機場、帶著滿滿的美好回憶返回溫暖的家，結束精采豐富的慢遊紐西蘭南北島之旅！</span></span></p>'),
    hotel: ' SWEEHOME'
  }
  ];

  $scope.intro = {
    title: '2015-2016【OFF慢遊】紐西蘭南島深度精華遊12天',
    price: 'NT$138,800 起',
    location: '紐西蘭',
    city: '奧克蘭/基督城/皇后鎮',
    days: '12天9夜',
    airplane: '中華航空'
  };

  var airplaneRef = [{
    through: [{
      day: '第 1 天',
      from: '台北',
      to: '奧克蘭',
      time: '23:00-17:50+1',
      airplane: '中華航空',
      flightNo: 'C151',
    }, {
      from: '羅吐魯阿',
      to: '皇后鎮',
      time: '09:10-12:35',
      airplane: '紐西蘭航空',
      flightNo: 'NZ5863'
    }, {
      day: '第 12 天',
      from: '基督城',
      to: '台北',
      time: '19:15-04:30+1',
      airplane: '中華航空',
      flightNo: 'C156'
    }]
  }, {
  }];
  function transAirplaneRef(airplanRef) {
    var results = [];
    _.forEach(airplaneRef, function(ref, i) {
      _.forEach(ref.through, function(path, j) {
        if (!j) {
          path.index = i;
          path.itemNum = ref.through.length;
        }
        results.push(path);
      });
    });
    return results;
  }
  $scope.airplanes = transAirplaneRef(airplaneRef);
  $scope.productions = search.data;
});
