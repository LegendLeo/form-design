// import api from "../../assets/js/api.js"

const state = {
	pageData: {
		list: [],
		config: {
			title: '骏伯网络'
		},
	},
	selectWg: []
}

const actions = {
	// getBusinessTypeList({commit}) {
	//   api.vkcPost2("supermarketloan/crm/qualitycontrol/findAllBusinessTypes", "", res => {
	//     commit(types.BUSINESS_TYPE_LIST, res);
	//   });
	// }
}

// const getters = {
//   businessTypeList: state => state.businessTypeList
// }

const mutations = {
	setSelectWg(state, payload) {
		state.selectWg = payload;
	}
}

export default {
	state,
	actions,
	mutations
}