export default async (type: 'id' | 'str', length: number) => {
	let result: any = null;
	switch (type) {
		case 'id':
			let num: number = Math.random() * (999999 - 100000) + 100000;
			result = Math.round(num);
			break;

		case 'str':
			let chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
			for (let i = 0; i < length; i++) {
				result += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			break;
	}
	return result;
};
