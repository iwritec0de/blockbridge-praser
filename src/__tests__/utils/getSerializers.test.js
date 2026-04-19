import getSerializers from '../../Utils/getSerializers';
import Image from '../../components/Image';

describe('getSerializers', () => {
	it('returns a serializer map', () => {
		const serializers = getSerializers();
		expect(typeof serializers).toBe('object');
	});

	it('maps core/image to the Image component', () => {
		const serializers = getSerializers();
		expect(serializers['core/image']).toBe(Image);
	});
});
