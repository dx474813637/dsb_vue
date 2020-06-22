const menuArr = [
	{
		id: '1',
		name: '基础数据库',
		path: 'data1',
		children: [{
			id: '114',
			name: '全球电商数据库',
			path: '/data/globalData',
			children: []
		},{
			id: '103',
			name: '电商行业数据库',
			path: '',
			children: [{
				id: '103-1',
				name: '电商整体',
				path: '/data/industryData',
				children: [{
					id: '103-1-1',
					name: '电子商务',
					path: '/data/industryData/dzsw',
				},{
					id: '103-1-2',
					name: '移动电商',
					path: '/data/industryData/ydds',
				},{
					id: '103-1-3',
					name: '电商人员',
					path: '/data/industryData/cyry',
				},{
					id: '103-1-4',
					name: '电商服务业',
					path: '/data/industryData/dsfwy',
				},{
					id: '103-1-5',
					name: '品牌电商服务',
					path: '/data/industryData/ppdsfw',
				},{
					id: '103-1-6',
					name: '网络经济',
					path: '/data/industryData/wljj',
				},{
					id: '103-1-7',
					name: '在线直播',
					path: '/data/industryData/zxzb',
				},{
					id: '103-1-8',
					name: '移动支付',
					path: '/data/industryData/ydzf',
				},]
			},{
				id: '103-2',
				name: '零售电商',
				path: '/data/industryData',
				children: [{
					id: '103-2-1',
					name: '网络零售',
					path: '/data/industryData/wlls',
				},{
					id: '103-2-2',
					name: '社交电商',
					path: '/data/industryData/sjds',
				},{
					id: '103-2-3',
					name: '农村电商',
					path: '/data/industryData/ncds',
				},{
					id: '103-2-4',
					name: '生鲜电商',
					path: '/data/industryData/sxds',
				},{
					id: '103-2-5',
					name: '母婴电商',
					path: '/data/industryData/myds',
				},{
					id: '103-2-6',
					name: '奢侈品电商',
					path: '/data/industryData/scpds',
				},{
					id: '103-2-7',
					name: '微商',
					path: '/data/industryData/wx',
				},{
					id: '103-2-8',
					name: '二手电商',
					path: '/data/industryData/esds',
				},{
					id: '103-2-9',
					name: '二手车电商',
					path: '/data/industryData/escds',
				},{
					id: '103-2-10',
					name: '社区团购',
					path: '/data/industryData/sqtg',
				},{
					id: '103-2-11',
					name: '家电电商',
					path: '/data/industryData/jdds',
				},{
					id: '103-2-12',
					name: '食品电商',
					path: '/data/industryData/spds',
				},{
					id: '103-2-13',
					name: '医药电商',
					path: '/data/industryData/yyds',
				},{
					id: '103-2-14',
					name: '海外代购',
					path: '/data/industryData/hwdg',
				},{
					id: '103-2-15',
					name: '美妆电商',
					path: '/data/industryData/mzds',
				},{
					id: '103-2-16',
					name: '导购电商',
					path: '/data/industryData/dgds',
				},{
					id: '103-2-17',
					name: '个护美妆',
					path: '/data/industryData/ghmz',
				},{
					id: '103-2-18',
					name: '天猫双11',
					path: '/data/industryData/tmsh11',
				},{
					id: '103-2-19',
					name: '全网双11',
					path: '/data/industryData/qwsh11',
				},{
					id: '103-2-20',
					name: '京东双11',
					path: '/data/industryData/jdsh11',
				},{
					id: '103-2-21',
					name: '代运营',
					path: '/data/industryData/dyy',
				},{
					id: '103-2-22',
					name: '家居建材',
					path: '/data/industryData/jjjc',
				},{
					id: '103-2-23',
					name: '快消品电商',
					path: '/data/industryData/kxpds',
				},{
					id: '103-2-24',
					name: 'B2C电商',
					path: '/data/industryData/b2cds',
				},{
					id: '103-2-25',
					name: '服装电商',
					path: '/data/industryData/fzds',
				},]
			},{
				id: '103-3',
				name: '产业电商',
				path: '/data/industryData',
				children: [{
					id: '103-3-1',
					name: '产业电商',
					path: '/data/industryData/b2bds',
				},{
					id: '103-3-2',
					name: '大宗电商',
					path: '/data/industryData/dzds',
				},{
					id: '103-3-3',
					name: '快消品B2B',
					path: '/data/industryData/kxpb2b',
				},{
					id: '103-3-4',
					name: '钢铁电商',
					path: '/data/industryData/gtds',
				},{
					id: '103-3-5',
					name: '医药B2B',
					path: '/data/industryData/yyb2b',
				},{
					id: '103-3-6',
					name: '企业采购',
					path: '/data/industryData/qycg',
				},{
					id: '103-3-7',
					name: '工业电商',
					path: '/data/industryData/gyds',
				},{
					id: '103-3-8',
					name: '纺服B2B',
					path: '/data/industryData/ffb2b',
				},]
			},{
				id: '103-4',
				name: '生活服务电商',
				path: '/data/industryData',
				children: [{
					id: '103-4-1',
					name: '生活服务电商',
					path: '/data/industryData/shfwds',
				},{
					id: '103-4-2',
					name: '在线外卖',
					path: '/data/industryData/zxwm',
				},{
					id: '103-4-3',
					name: '在线旅游',
					path: '/data/industryData/zxly',
				},{
					id: '103-4-4',
					name: '在线教育',
					path: '/data/industryData/zxjy',
				},{
					id: '103-4-5',
					name: '互联网医疗',
					path: '/data/industryData/hlwyl',
				},{
					id: '103-4-6',
					name: '互联网家装',
					path: '/data/industryData/hlwjz',
				},{
					id: '103-4-7',
					name: '互联网餐饮',
					path: '/data/industryData/ymds',
				},{
					id: '103-4-8',
					name: '医美电商',
					path: '/data/industryData/hlwcy',
				},]
			},{
				id: '103-5',
				name: '跨境电商',
				path: '/data/industryData',
				children: [{
					id: '103-5-1',
					name: '跨境电商',
					path: '/data/industryData/kjds',
				},{
					id: '103-5-2',
					name: '出口跨境电商',
					path: '/data/industryData/ckkjds',
				},{
					id: '103-5-3',
					name: '进口跨境电商',
					path: '/data/industryData/jkkjds',
				},{
					id: '103-5-4',
					name: '跨境支付',
					path: '/data/industryData/kjzf',
				},]
			},{
				id: '103-6',
				name: '共享经济',
				path: '/data/industryData',
				children: [{
					id: '103-6-1',
					name: '共享经济',
					path: '/data/industryData/gxjj',
				},{
					id: '103-6-2',
					name: '共享单车',
					path: '/data/industryData/gxdc',
				},{
					id: '103-6-3',
					name: '共享住宿',
					path: '/data/industryData/gxzs',
				},{
					id: '103-6-4',
					name: '网约车',
					path: '/data/industryData/wyc',
				},{
					id: '103-6-5',
					name: '共享充电宝',
					path: '/data/industryData/gxcdb',
				},{
					id: '103-6-6',
					name: '共享办公',
					path: '/data/industryData/gxbg',
				},{
					id: '103-6-7',
					name: '共享汽车',
					path: '/data/industryData/gxqc',
				},]
			},{
				id: '103-7',
				name: '物流科技',
				path: '/data/industryData',
				children: [{
					id: '103-7-1',
					name: '电商物流',
					path: '/data/industryData/dswl',
				},{
					id: '103-7-2',
					name: '全球电商物流',
					path: '/data/industryData/qqdswl',
				},{
					id: '103-7-3',
					name: '即时物流',
					path: '/data/industryData/jswl',
				},{
					id: '103-7-4',
					name: '同城生活服务电商',
					path: '/data/industryData/tc生活服务电商',
				},{
					id: '103-7-5',
					name: '智慧物流',
					path: '/data/industryData/zhwl',
				},{
					id: '103-7-6',
					name: '冷链物流',
					path: '/data/industryData/llwl',
				},{
					id: '103-7-7',
					name: '社区生活服务电商',
					path: '/data/industryData/sq生活服务电商',
				},{
					id: '103-7-8',
					name: '货运物流',
					path: '/data/industryData/hywl',
				},{
					id: '103-7-9',
					name: '社会物流',
					path: '/data/industryData/shwl',
				},{
					id: '103-7-10',
					name: '同城货运',
					path: '/data/industryData/tchy',
				},]
			},]
		},],
	},
	{
		id: '4',
		name: '公司数据库',
		path: 'data4',
		children: [{
			id: '403',
			name: '全部',
			path: '/data/cpyDataList/0',
			children: []
		},{
			id: '401',
			name: '上市',
			path: '/data/cpyDataList/1',
			children: []
		},{
			id: '404',
			name: '独角兽',
			path: '/data/cpyDataList/2',
			children: []
		},{
			id: '405',
			name: '千里马',
			path: '/data/cpyDataList/3',
			children: []
		},{
			id: '402',
			name: '新三板',
			path: '/data/cpyDataList/4',
			children: []
		},]
	},
	{
		id: '2',
		name: '领域数据库',
		path: 'data2',
		children: [{
			id: '201',
			name: '零售电商',
			children: []
		},{
			id: '202',
			name: '跨境电商',
			children: []
		},{
			id: '203',
			name: '产业电商',
			children: []
		},{
			id: '204',
			name: '生活服务电商',
			children: []
		},{
			id: '205',
			name: '物流科技',
			children: []
		},{
			id: '206',
			name: '金融科技',
			children: []
		},]
	},
	{
		id: '3',
		name: '电数宝开放平台',
		path: 'data3',
		children: [{
			id: '309',
			name: '中国国家数据中心',
			path: 'http://data.stats.gov.cn/search.htm',
		},{
			id: '316',
			name: '中国人民银行征信中心',
			path: 'http://www.pbccrc.org.cn',
		},{
			id: '301',
			name: '中国裁判文书网',
			path: 'http://wenshu.court.gov.cn/',
		},{
			id: '302',
			name: '海关数据',
			path: 'http://online.customs.gov.cn/static/pages/mySearch.html',
		},{
			id: '326',
			name: '海关统计数据',
			path: 'http://43.248.49.97/?nsukey=Gz8jsjYPF4OXfv7ValwVRUSbVV9nEBNt0AaHEIJ6eEvStvYuDw2wWYrV51eeZzr5Ilrd2AsoJm7LAstsEwbGkD5Q0Q0BBiT8gZI20gmluuRv%2BKtg9a0QXTkKC80XO5WAA1Gd3a%2B8pzID1KdpAVd3s2kg6XZHpdRo5vlYapNhBizVMcN0ie3MeJC9N%2BKKlIp05Gk6Y%2BMEpnrbZYEofGmEbA%3D%3D',
		},{
			id: '305',
			name: '中国知网',
			path: 'https://www.cnki.net/',
		},{
			id: '313',
			name: '中国宏观数据',
			path: 'http://www.100ppi.com/mac/data---1111.html',
		},{
			id: '310',
			name: '生意社-大宗商品数据库',
			path: 'http://www.100ppi.com/data/',
		},{
			id: '307',
			name: '农产品批发市场价格指数',
			path: 'http://www.chinaapm-data.com/',
		},{
			id: '315',
			name: '网络零售发展指数',
			path: 'http://www.ec.com.cn/list/dsyj/wllsfzzs/1/cateinfo.html',
		},{
			id: '317',
			name: '中国P2P网贷指数',
			path: 'http://www.p2p001.com/wdzs/wdzs_p2pline.html',
		},{
			id: '306',
			name: '百度指数',
			path: 'http://index.baidu.com/v2/index.html',
		},{
			id: '308',
			name: '阿里指数',
			path: 'http://index.1688.com/',
		},{
			id: '325',
			name: '阿拉丁小程序指数',
			path: 'http://www.aldzs.com/',
		},{
			id: '320',
			name: '新华指数',
			path: 'http://index.xinhua08.com/',
		},{
			id: '321',
			name: '居民消费价格指数(CPI)',
			path: 'http://data.eastmoney.com/cjsj/cpi.html',
		},{
			id: '322',
			name: '工业品出厂价格指数(PPI)',
			path: 'http://data.eastmoney.com/cjsj/ppi.html',
		},{
			id: '312',
			name: '七麦APP数据',
			path: 'https://www.qimai.cn/rank/rankTrend/brand/free/country/cn/genre/5000/device/iphone',
		},{
			id: '318',
			name: '站长之家APP榜单',
			path: 'https://aso.chinaz.com/android.html',
		},{
			id: '311',
			name: '东方财富研报库',
			path: 'http://data.eastmoney.com/report/',
		},{
			id: '314',
			name: 'QUEST数据报告',
			path: 'http://www.questmobile.com.cn/research/report-new',
		},{
			id: '327',
			name: '全球经济数据',
			path: 'http://dc.xinhua08.com/',
		},{
			id: '319',
			name: 'Alexa网站排名',
			path: 'http://www.alexa.cn/',
		},{
			id: '304',
			name: '淘宝村分布图',
			path: 'http://topic.aliresearch.com/market/aliresearch/tbcfbt.php',
		},{
			id: '323',
			name: '微热点（微舆情）',
			path: 'http://www.wrd.cn/login.shtml',
		},{
			id: '324',
			name: '企查查',
			path: 'https://www.qichacha.com/',
		},]
	}
]
export default menuArr