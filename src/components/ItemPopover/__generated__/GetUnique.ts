/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ModifierType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetUnique
// ====================================================

export interface GetUnique_uniqueByName_modifiers_nodes {
  type: ModifierType;
  text: string;
  optional: boolean;
}

export interface GetUnique_uniqueByName_modifiers {
  /**
   * A list of `Modifier` objects.
   */
  nodes: GetUnique_uniqueByName_modifiers_nodes[];
}

export interface GetUnique_uniqueByName {
  name: string;
  baseType: string;
  iconUrl: string;
  flavourText: string;
  levelRequirement: number;
  strRequirement: number;
  dexRequirement: number;
  intRequirement: number;
  /**
   * Reads and enables pagination through a set of `Modifier`.
   */
  modifiers: GetUnique_uniqueByName_modifiers;
}

export interface GetUnique {
  uniqueByName: GetUnique_uniqueByName | null;
}

export interface GetUniqueVariables {
  name: string;
}