import { Telegram } from '@material-ui/icons';
import { observable, computed, action, runInAction } from 'mobx';

const STORAGE_KEY = '_HistoryQuery';

const black = ["‘","’", "“”", "〝","〞","\"","\'", "（","）", "〈","〉", "‹","›", "﹛","﹜", "『","』", "〖","〗", "［","］", "《","》", "〔","〕", "{","}", "「","」", "【","】", "。", "，", "、", "＇", "：", "∶", "；", "?", "ˆ", "ˇ", "﹕", "︰", "﹔", "﹖", "﹑", "·", "¨", "…", ".", "¸", ";", "！", "´", "？", "！", "～", "—", "ˉ", "｜", "‖", "＂", "〃", "｀", "@", "﹫", "¡", "¿", "﹏", "﹋", "﹌", "︴", "々", "﹟", "#", "﹩", "$", "﹠", "&", "﹪", "%", "*", "﹡", "﹢", "﹦", "﹤", "‐", "￣", "¯", "―", "﹨", "ˆ", "˜", "﹍", "﹎", "+", "=", "<", "­", "­", "＿", "_", "-", "ˇ", "~", "﹉", "﹊", "︵", "︷", "︿", "︹", "︽", "_", "﹁", "﹃", "︻", "︶", "︸", "﹀", "︺", "︾", "ˉ", "﹂", "﹄", "︼",":"]
const reg = new RegExp(`^[${black.join(",")}]+$`)
interface IHistoryQuery {
	[key: string]: Array<string>;
}
export class Store {
	@observable historyQuery: IHistoryQuery = {};
	@observable currentScene = '';

	constructor() {
		try {
			this.historyQuery = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
		} catch (e) {
			console.log(e);
		}
	}

	@computed
	get currentSceneHistoryQuery() {
		return this.historyQuery[this.currentScene] || [];
	}
	@action.bound
	changeScene(scene: string) {
		this.currentScene = scene;
	}
	@action.bound
	changeHistory(word: string) {
		if (!word) return
		if (reg.test(word)) return
		if (!this.historyQuery[this.currentScene]) {
			this.historyQuery[this.currentScene] = [];
		}
		if (!this.historyQuery[this.currentScene].includes(word)) {
			this.historyQuery[this.currentScene].unshift(word);
			// 把索引15以后的删除掉
			this.historyQuery[this.currentScene].splice(15, 10);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.historyQuery));
		}
     
	}
}
const storageStore = new Store();

export { storageStore };
