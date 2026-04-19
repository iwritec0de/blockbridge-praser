import {
	Audio,
	Button,
	Buttons,
	Code,
	Column,
	Columns,
	Cover,
	DefaultBlock,
	Embed,
	File,
	Gallery,
	Group,
	Heading,
	Image,
	List,
	ListItem,
	MediaText,
	Paragraph,
	Quote,
	Separator,
	Spacer,
	Table,
	Verse,
	Video,
} from '../components';
import type { SerializerMap } from '../types';

const getSerializers = (): SerializerMap => {
	const serializers: SerializerMap = {
		'core/audio': Audio,
		'core/button': Button,
		'core/buttons': Buttons,
		'core/code': Code,
		'core/column': Column,
		'core/columns': Columns,
		'core/cover': Cover,
		'core/embed': Embed,
		'core/file': File,
		'core/gallery': Gallery,
		'core/group': Group,
		'core/heading': Heading,
		'core/html': DefaultBlock,
		'core/image': Image,
		'core/list': List,
		'core/list-item': ListItem,
		'core/media-text': MediaText,
		'core/paragraph': Paragraph,
		'core/preformatted': DefaultBlock,
		'core/pullquote': DefaultBlock,
		'core/quote': Quote,
		'core/separator': Separator,
		'core/spacer': Spacer,
		'core/table': Table,
		'core/verse': Verse,
		'core/video': Video,
	};

	return serializers;
};

export default getSerializers;
