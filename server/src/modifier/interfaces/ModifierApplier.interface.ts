import ModificationTypesType from "../types/ModificationTypes.type";

interface ModifierApplierInterface {
	source: string;
	type: ModificationTypesType;
	modifier: number;
	situational: boolean;
	description?: string;
}

export default ModifierApplierInterface;
