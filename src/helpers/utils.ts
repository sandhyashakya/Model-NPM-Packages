/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import https from 'https';
import { ENV_VARIABLE } from '../configs/env';
import * as dateFunction from 'date-fns';
import csvParser from 'csv-parser';
import { APP_TYPE, EMAIL_TEMPLATES, PAGINATION, PDF_MICRO_SERVICE_END_POINT, templateKeyWord, UPLOAD_PATH, USER_TYPES } from '../constants/app';
import { TPdfOption } from '../types/commanType';
import Joi from 'joi';
import { validate, version, v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})');

export const pick = <T extends object, K extends keyof T>(objOrArray: T | T[], keys: K[]): Pick<T, K> | Pick<T, K>[] => {
    const pickObject = (obj: T): Pick<T, K> =>
        keys.reduce(
            (acc, key) => {
                if (key in obj) {
                    acc[key] = obj[key];
                }
                return acc;
            },
            {} as Pick<T, K>,
        );

    // Check if input is an array
    if (Array.isArray(objOrArray)) {
        return objOrArray.map(obj => pickObject(obj));
    }

    // Otherwise, it's a single object
    return pickObject(objOrArray);
};

export const isValidMongoDbId = Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
        'string.pattern.base': `"id" must be a valid MongoDB ObjectId`,
    });

export const omit = <T extends object, K extends keyof T>(objOrArray: T | T[], keys: K[]): Omit<T, K> | Omit<T, K>[] => {
    const omitObject = (obj: T): Omit<T, K> =>
        Object.keys(obj).reduce(
            (acc, key) => {
                // Check if the key is not in the list of keys to omit
                if (!keys.includes(key as K)) {
                    // Assert the correct key type and assign the value
                    (acc as any)[key] = obj[key as keyof T];
                }
                return acc;
            },
            {} as Omit<T, K>,
        );

    // Check if the input is an array
    if (Array.isArray(objOrArray)) {
        return objOrArray.map(item => omitObject(item));
    }

    // Otherwise, it's a single object
    return omitObject(objOrArray);
};

export const ensureDirectoryExists = (directory: string) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

export const generateOtp = (length: number = 6): string => {
    const digits = '0123456789';
    let otp: string = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};

export const generateAlphaNumericCode = (length = 8): string => {
    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
    };

    // Ensure password contains at least one character from each required group
    let password = [
        chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)],
        chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)],
        chars.numbers[Math.floor(Math.random() * chars.numbers.length)],
    ];

    // Fill the rest of the password to reach the minimum length of 8
    const allChars = chars.lowercase + chars.uppercase + chars.numbers;
    while (password.length < length) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle password array and join it as a string
    password = password.sort(() => 0.5 - Math.random());

    const tempPassword = password.join('');

    return tempPassword;
};

export const generateTempPassword = (length = 8): string => {
    const chars = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '.@#',
    };

    // Ensure password contains at least one character from each required group
    let password = [
        chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)],
        chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)],
        chars.numbers[Math.floor(Math.random() * chars.numbers.length)],
        chars.symbols[Math.floor(Math.random() * chars.symbols.length)],
    ];

    // Fill the rest of the password to reach the minimum length of 8
    const allChars = chars.lowercase + chars.uppercase + chars.numbers + chars.symbols;
    while (password.length < length) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle password array and join it as a string
    password = password.sort(() => 0.5 - Math.random());

    const tempPassword = password.join('');

    // Verify if the password meets the regex requirement
    return PASSWORD_REGEX.test(tempPassword) ? tempPassword : generateTempPassword();
};

export const readEmailTemplate = async (templateName: string): Promise<string> => {
    const globalFilePath = path.join(process.cwd(), 'emailTemplates', `globalEmailTemplate.ejs`);

    const filePath = path.join(process.cwd(), 'emailTemplates', `${templateName}.ejs`);
    let globalEmailTemplate = await fs.readFileSync(globalFilePath, 'utf-8');
    const html = ejs.render(globalEmailTemplate, {
        data: {
            kipiLogo: `${ENV_VARIABLE.SERVER_URL}/public/kipilogo.png`,
            googlePlayLogo: `${ENV_VARIABLE.SERVER_URL}/public/googleplaylogo.png`,
            applePlayLogo: `${ENV_VARIABLE.SERVER_URL}/public/appleplaylogo.png`,
        },
    });
    globalEmailTemplate = html.replaceAll('\r\n', '');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                return reject(err);
            }
            resolve(globalEmailTemplate.replace(/{{content}}/g, content));
        });
    });
};

export const readEmailTemplateWithOutGlobal = async (data: any, templateName?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const templatePath = path.join(process.cwd(), 'emailTemplates', `${templateName || EMAIL_TEMPLATES.COMMON_TEMPLATE}.ejs`);

        fs.readFile(templatePath, 'utf-8', (err, templateContent) => {
            if (err) {
                return reject(err);
            }

            const html = ejs.render(templateContent, {
                logoUrl: data.instituteLogo,
                content: data.content,
                googlePlayLogo: `${process.env.SERVER_URL}/public/googleplaylogo.png`,
                appStoreLogo: `${process.env.SERVER_URL}/public/appleplaylogo.png`,
            });

            resolve(html);
        });
    });
};
export const replaceTemplateKeywords = (template: string, data: any): string => {
    let result = template;

    templateKeyWord.forEach(({ keyWord, value }) => {
        const replacementValue = typeof value === 'function' ? value(data) : value;
        result = result.replace(new RegExp(keyWord, 'g'), replacementValue);
    });

    return result;
};
export const replaceTemplateKeywordsForGreeting = (template: string, data: Record<string, any>): string => {
    // Replace any @key in template with value from data object
    return template.replace(/@(\w+)/g, (_, key) => {
        // fallback to empty string if key not found
        return data[key] ?? "";
    });
};
export const readPdfTemplate = async (object: TPdfOption): Promise<IFileStorageAttributes> => {
    try {
        const uploadPath = object.customPath || path.join(process.cwd(), UPLOAD_PATH);
        ensureDirectoryExists(uploadPath);

        const templatePath = path.join(process.cwd(), 'htmlTemplates', `${object.templateName}.html`);
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found: ${templatePath}`);
        }
        const templateData = fs.readFileSync(templatePath, 'utf-8');

        const template = ejs.render(templateData, object.data);
        // const resultData = [];
        // for (let i = 0; i < 200; i++) {
        //     resultData.push(template);
        // }

        const isProduction = process.env.NODE_ENV === 'production';

        const httpsAgent = isProduction
            ? undefined
            : new https.Agent({
                  rejectUnauthorized: false,
              });

        const fileName = object.customFileName || `${new Date().toISOString().split('T')[0]}_invoice_${object.data?.invoice?.number}.pdf`;
        const fileData = await axios.post(
            `${ENV_VARIABLE.PDF_MICRO_SERVICE_API_URL}${PDF_MICRO_SERVICE_END_POINT.PDF_API_URL}`,
            {
                data: template,
                storagePath: object.customstoragePath || S3_STORAGE_PATH.FEE_HISTORY_PATH,
                fileName: fileName,
            },
            {
                httpsAgent,
            },
        );

        return fileData.data.data as IFileStorageAttributes;
    } catch (error) {
        throw error;
    }
};
type UniqueByFields<T> = (array: T[], fields: (keyof T)[]) => T[];

export const getUniqueArrayByFields: UniqueByFields<any> = (array, fields) => {
    const uniqueMap = new Map<string, any>();

    array.forEach(item => {
        const key = fields.map(field => item[field]).join('-');
        if (!uniqueMap.has(key)) {
            uniqueMap.set(key, item);
        }
    });

    return Array.from(uniqueMap.values());
};

export const keyByFieldOrFields = <T>(array: T[], fields: keyof T | (keyof T)[]): Record<string, T> => {
    return array.reduce(
        (result, item) => {
            const key = Array.isArray(fields)
                ? fields.map(field => item[field]).join('-') // Composite key for multiple fields
                : item[fields]; // Single field key

            result[key as string] = item; // Type assertion to ensure the key is string
            return result;
        },
        {} as Record<string, T>,
    );
};

/**
 * Groups an array of objects by a specified field or multiple fields.
 *
 * @param array - The array of objects to group.
 * @param fields - A single field or an array of fields to group by.
 * @returns An object where keys are the grouped field values and values are arrays of grouped objects.
 */
export function groupByFieldOrFields<T>(array: T[], fields: keyof T | (keyof T)[]): Record<string, T[]> {
    return array.reduce<Record<string, T[]>>((result, item) => {
        const key = Array.isArray(fields)
            ? fields.map(field => item[field]).join('-') // Composite key for multiple fields
            : item[fields]; // Single field key

        const groupKey = String(key); // Ensuring the key is always a string

        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        result[groupKey].push(item);
        return result;
    }, {});
}

export const isTimeWithinRange = (time: Date, rangeStart: Date, rangeEnd: Date): boolean => {
    const getTimeMs = (date: Date) =>
        date.getUTCHours() * 3600000 + date.getUTCMinutes() * 60000 + date.getUTCSeconds() * 1000 + date.getUTCMilliseconds();

    const timeMs = getTimeMs(time);
    const startMs = getTimeMs(rangeStart);
    const endMs = getTimeMs(rangeEnd);

    // If the time range does not cross midnight
    if (startMs <= endMs) {
        return timeMs >= startMs && timeMs <= endMs;
    }

    // If the time range crosses midnight
    return timeMs >= startMs || timeMs <= endMs;
};

// export const isTimeWithinRange = (time: string | Date, rangeStart: string | Date, rangeEnd: string | Date): boolean => {
//     const extractTime = (isoString: string) => {
//         const date = parseISO(new Date(isoString).toISOString());
//         return getHours(date) * 3600 + getMinutes(date) * 60 + getSeconds(date); // Convert to total seconds
//     };

//     const timeSeconds = extractTime(time as string);
//     const startSeconds = extractTime(rangeStart as string);
//     const endSeconds = extractTime(rangeEnd as string);

//     return timeSeconds >= startSeconds && timeSeconds <= endSeconds;
// };

export const isDateWithinRange = (date: Date | string, rangeStart: Date | string, rangeEnd: Date | string): boolean => {
    const dateValue = new Date(date).getTime();
    const startValue = new Date(rangeStart).getTime();
    const endValue = new Date(rangeEnd).getTime();

    return dateValue >= startValue && dateValue <= endValue;
};

export const startOfDay = (date: string | Date): Date => {
    return dateFunction.startOfDay(dateFunction.parseISO(new Date(date).toISOString()));
};
export const generateUuidToNumber = (uuid?: string): string => {
    if (!uuid) uuid = uuidv4();
    // Remove dashes from the UUID
    let numericId = uuid.replace(/-/g, '');

    // Convert hex characters to numbers (keeping only digits)
    numericId = BigInt('0x' + numericId).toString();

    return numericId;
};
export const endOfDay = (date: string | Date): Date => {
    return dateFunction.endOfDay(dateFunction.parseISO(new Date(date).toISOString()));
};

type GroupByFields<T> = (array: T[], fields: keyof T | (keyof T)[]) => Record<string, T[]>;

export const groupByFields: GroupByFields<any> = (array, fields) => {
    const groupedObject: Record<string, any[]> = {};

    array.forEach(item => {
        // Normalize `fields` to always be an array
        const fieldArray = Array.isArray(fields) ? fields : [fields];

        // Create a key based on the specified fields
        const key = fieldArray.map(field => item[field]).join('-');

        // If the key doesn't exist, initialize it with an empty array
        if (!groupedObject[key]) {
            groupedObject[key] = [];
        }

        // Add the current item to the corresponding group
        groupedObject[key].push(item);
    });

    return groupedObject;
};

type SortOrder = 'asc' | 'desc';
interface SortField<T> {
    key: keyof T;
    order?: SortOrder;
}
/**
 * Sorts an array of objects based on specified fields and order.
 *
 * @param array - The array to be sorted.
 * @param fields - A single sort field or an array of sort fields.
 * @returns A new sorted array.
 */
export const sortArray = <T>(array: T[], fields: SortField<T> | SortField<T>[]): T[] => {
    const fieldArray: SortField<T>[] = Array.isArray(fields) ? fields : [fields]; // Normalize to an array

    return [...array].sort((a, b) => {
        for (const { key, order = 'asc' } of fieldArray) {
            const valueA = a[key];
            const valueB = b[key];

            // Handle undefined or null values safely
            if (valueA == null && valueB == null) continue;
            if (valueA == null) return order === 'asc' ? 1 : -1;
            if (valueB == null) return order === 'asc' ? -1 : 1;

            // Compare values (handling numbers and strings properly)
            const comparison = typeof valueA === 'string' && typeof valueB === 'string' ? valueA.localeCompare(valueB) : valueA > valueB ? 1 : -1;

            if (comparison !== 0) return order === 'asc' ? comparison : -comparison;
        }

        return 0; // All fields are equal
    });
};

/**
 * Gets all nested children for a given parent ID.
 *
 * @param array - Array of nodes representing the flat hierarchy.
 * @param parentIds - The ID of the parent node.
 * @param parentIdKey - The key used to reference the parent ID.
 * @returns A flattened list of all children.
 */
export const getChildrenByParentId = <T extends Record<string, any>>(array: T[], parentIds: string | string[], parentIdKey: keyof T): T[] => {
    const parentIdList = Array.isArray(parentIds) ? parentIds : [parentIds]; // Normalize parentIds to an array
    const result: T[] = array.filter(one => parentIds.includes(one.id));

    //all id list that are included in result array
    const includedIds = [...parentIdList];

    /**
     * Recursively collects all children for the given parent IDs.
     *
     * @param currentParentIds - The current parent IDs being processed.
     */
    const collectChildren = (currentParentIds: string[]) => {
        for (const node of array) {
            if (currentParentIds.includes(node[parentIdKey] as string)) {
                if (!includedIds.includes(node.id)) {
                    result.push(node);
                    includedIds.push(node.id);
                }
                collectChildren([node.id as string]); // Recursively collect children of this node
            }
        }
    };

    collectChildren(parentIdList); // Start collecting from the given parent IDs

    return result;
};

/**
 * Gets all nested children for a given parent ID.
 *
 * @param array - Array of nodes representing the flat hierarchy.
 * @param childIds - The ID of the parent node.
 * @param parentIdKey - The key used to reference the parent ID..
 * @returns A flattened list of all parents.
 */
export const getParentsByChildrenId = <T extends Record<string, any>>(array: T[], childIds: string | string[], parentIdKey: keyof T): T[] => {
    const childIdList = Array.isArray(childIds) ? childIds : [childIds]; // Normalize childIds to an array
    const result: T[] = [];
    const includedIds = new Set<string>(); // Track included IDs to avoid duplicates

    /**
     * Recursively collects all parent nodes for the given child IDs.
     *
     * @param currentChildIds - The current child IDs being processed.
     */
    const collectParents = (currentChildIds: string[]) => {
        for (const childId of currentChildIds) {
            const childNode = array.find(node => node.id === childId);
            if (childNode && !includedIds.has(childNode.id)) {
                result.push(childNode); // Add the current child node to the result
                includedIds.add(childNode.id);

                // Recursively find parents if `parentIdKey` exists
                if (childNode[parentIdKey]) {
                    collectParents([childNode[parentIdKey]]);
                }
            }
        }
    };

    collectParents(childIdList); // Start collecting from the provided child IDs

    return result;
};

/**
 * Builds a nested structure from a flat array of items based on a parent-child relationship.
 *
 * @param items - The array of items that need to be organized.
 * @param parentIdKey - The key that refers to the parent ID in each item.
 * @param nestedListKey - The key that will store the nested child items for each parent.
 *
 * @returns An array of root-level items, each containing its nested children in the `nestedListKey`.
 */
export const buildNestedStructure = <T extends Record<string, any>>(items: T[], parentIdKey: keyof T, nestedListKey: string): T[] => {
    // Clone the items to avoid modifying the original array
    const clonedItems = JSON.parse(JSON.stringify(items));

    const map = new Map<string, T>(); // Map to associate items by their `id`
    const roots: T[] = []; // Array to hold root-level items
    const orphans: T[] = []; // Array to hold orphaned items

    // Populate the map and initialize the nested list
    clonedItems.forEach((item: T) => {
        map.set(item.id, item);
        (item as any)[nestedListKey] = []; // Initialize children array
    });

    // Build the nested structure
    clonedItems.forEach((item: T) => {
        const parentId = item[parentIdKey] as string | undefined;

        if (!parentId) {
            // Root-level item (no parentId)
            roots.push(item);
        } else {
            // Find parent and add this item as a child
            const parent = map.get(parentId);
            if (parent) {
                (parent as any)[nestedListKey].push(item);
            } else {
                orphans.push(item); // Add to orphaned items if parent is missing
            }
        }
    });

    // Append orphaned items to the roots array or process them differently if required
    if (orphans.length > 0) {
        roots.push(...orphans); // Add orphaned items to the roots array
    }

    return roots; // Return the root-level items, each containing its nested children
};

export const parseCSV = async (filePath: string): Promise<any[]> => {
    return await new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data: any) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error));
    });
};

/**
 * Flattens a nested structure into a flat array while preserving the parent-child relationship.
 *
 * @param items - The nested array of items to be flattened.
 * @param parentIdKey - The key that will store the parent ID in each flattened item.
 * @param nestedListKey - The key that contains the nested child items.
 *
 * @returns A flat array of items, each containing a reference to its parent ID.
 */
export const flattenNestedStructure = <T extends Record<string, any>>(
    items: T[],
    parentIdKey: keyof T,
    nestedListKey: string,
): Omit<T, typeof nestedListKey>[] => {
    const flatArray: Omit<T, typeof nestedListKey>[] = [];

    const processItems = (items: T[], parentId?: string) => {
        items.forEach(item => {
            // Create a shallow copy without the nested list key
            const { [nestedListKey]: children, ...rest } = item;

            // Assign the parent ID
            const flattenedItem = { ...rest, [parentIdKey]: parentId } as Omit<T, typeof nestedListKey>;
            flatArray.push(flattenedItem);

            // Recursively process children if they exist
            if (Array.isArray(children) && children.length > 0) {
                processItems(children, String(item.id));
            }
        });
    };

    processItems(items);
    return flatArray;
};

/**
 * Removes all falsy values from an object.
 *
 * A falsy value in JavaScript/TypeScript includes:
 * - false
 * - 0 (zero)
 * - "" (empty string)
 * - null
 * - undefined
 * - NaN (Not-a-Number)
 *
 * This function iterates through the object's properties and removes any key-value pairs
 * where the value is falsy. Only truthy values remain in the final object.
 *
 * @param obj - The input object containing key-value pairs.
 * @returns A new object with all falsy values removed.
 *
 * @example
 * const data = {
 *   name: "Alice",
 *   age: 25,
 *   isAdmin: false,
 *   score: 0,
 *   city: "",
 *   country: "USA",
 *   email: null,
 *   phone: undefined,
 *   balance: NaN,
 * };
 *
 * const cleanedData = removeFalsyValues(data);
 * console.log(cleanedData);
 * // Output: { name: 'Alice', age: 25, country: 'USA' }
 */
export const removeFalsyValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => Boolean(value))) as Partial<T>;
};

export const isValidUUID = (id: string, expectedVersion?: 1 | 4): boolean => {
    if (!validate(id)) return false;
    if (expectedVersion && version(id) !== expectedVersion) return false;
    return true;
};

import { OrderItem, Sequelize } from 'sequelize';
import { IFileStorageAttributes } from '../interfaces/fileStorageInterface';
import { S3_STORAGE_PATH } from '../constants/fileStore';

/**
 * Parses ordering input and returns Sequelize-compatible order array.
 *
 * @param inputOrder - Array like [["columnName", "ASC"], ...]
 * @param defaultOrder - Fallback or additional default order (e.g. [['createdAt', 'DESC']])
 */
export const parseOrderOptions = (inputOrder: unknown, defaultOrder: OrderItem[] = [['createdAt', 'DESC']]): OrderItem[] => {
    const order: OrderItem[] = [];

    if (Array.isArray(inputOrder)) {
        for (const item of inputOrder) {
            if (Array.isArray(item) && item.length === 2) {
                const [column, direction] = item;
                if (typeof column === 'string' && typeof direction === 'string' && ['ASC', 'DESC'].includes(direction.toUpperCase())) {
                    // const normalizedColumn = toSnakeCase(column);
                    // order.push([Sequelize.literal(`"${normalizedColumn}"`), direction.toUpperCase()]);
                    // order.push([Sequelize.literal(`"${column}"`), direction.toUpperCase()]);
                    order.push([Sequelize.literal(`"${column}"`), direction.toUpperCase()]);
                }
            }
        }
    }

    // Ensure defaultOrder is always applied at the end if not already present
    const defaultKey = JSON.stringify(defaultOrder[0]);
    const hasDefault = order.some(o => JSON.stringify(o) === defaultKey);

    if (!hasDefault) {
        order.push(...defaultOrder);
    }

    return order;
};

import { TAeraModelCreationAttributes } from '../types/areaType';
import { IInstituteAttributes } from '../interfaces/instituteInterface';
import { IUserAttributes } from '../interfaces/userInterface';
import { Request } from 'express';
/**
 * Get all localities/suburbs for a given city using Overpass API (OpenStreetMap).
 * @param {string} cityName - Name of the city (e.g., "Ahmedabad")
 * @returns Array of objects with name fields to match AreaModel insert format.
 */
export const getCityAreas = async (cityName = ''): Promise<Partial<TAeraModelCreationAttributes>[]> => {
    if (!cityName) throw new Error('City name is required.');

    const query = `
    [out:json];
    area["name"="${cityName}"]["boundary"="administrative"]->.searchArea;
    (
      node["place"~"suburb|neighbourhood"](area.searchArea);
      way["place"~"suburb|neighbourhood"](area.searchArea);
      relation["place"~"suburb|neighbourhood"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  `;

    const url = 'https://overpass-api.de/api/interpreter';

    try {
        const response = await axios.post(url, `data=${encodeURIComponent(query)}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const elements = response.data.elements;
        const areas = elements.filter((el: any) => el.tags && el.tags.name).map((el: any) => el.tags.name.trim());
        return [...new Set(areas)] as TAeraModelCreationAttributes[]; // Remove duplicates
        // return [...new Set(areas)]; // Remove duplicates
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return [];
    }
};

export const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const normalizeToArray = (value: string | string[] | undefined): string[] | undefined =>
    value ? (Array.isArray(value) ? value : [value]) : undefined;
/**
 * Converts a snake_case string to Normal Text
 * @param {string} input - The snake_case string
 * @returns {string} - The converted Normal Text
 */
export const fromSnakeCaseToNormalText = (input: string): string => {
    if (typeof input !== 'string') return '';

    return input
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
export function assignNonNull<T extends Record<string, any>>(target: T, source: Record<string, any>): void {
    Object.entries(source).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            (target as Record<string, any>)[key] = value;
        }
    });
}

export function isUserSchoolInfoUpdate(institute: IInstituteAttributes, reqUser: IUserAttributes & { isAddDetails?: boolean }): boolean {
    return (
        !!(institute.type || institute.subType) &&
        (reqUser.isAddDetails || reqUser.type === USER_TYPES.INSTITUTE_MASTER_ADMIN || reqUser.type === USER_TYPES.INSTITUTE_ADMIN)
    );
}

export const getAppType = (req: Request): APP_TYPE => {
    const reqData = { ...req.body, ...req.query, ...req.params };
    return reqData.appType || req.headers['apptype'] || req.headers['Apptype'] || req.headers['appType'];
};

export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
/**
 * Safely gets a nested value from an object using a dot-separated path.
 */
function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : '-'), obj);
}

/**
 * Prepares userdata for EJS template based on dynamic columns config.
 * @param data Array of objects
 * @param columnsConfig Array of columns with { title, field }
 * @returns { userdata: any[], columns: string[] }
 */

export function extractFromObject(
    data: any[],
    config: { tableTitle: string; columns: { title: string; field: string }[] },
): { tableTitle: string; userdata: any[]; columns: string[] } {
    const columns = config.columns.map(col => col.title);

    const userdata = data.map(item => {
        const row: Record<string, any> = {};
        config.columns.forEach(col => {
            row[col.title] = getNestedValue(item, col.field);
        });
        return row;
    });
    return { tableTitle: config.tableTitle, userdata, columns };
}

export const enumAlternatives = (enumObj: Record<string, string>, isRequired = false, allowArray = true) => {
    const base = Joi.string().valid(...Object.values(enumObj));

    if (allowArray) {
        const alt: Joi.AlternativesSchema = Joi.alternatives().try(base, Joi.array().items(base));
        return isRequired ? alt.required() : alt.optional();
    }

    return isRequired ? base.required() : base.optional();
};

export const objectIdAlternatives = (isRequired = false, allowArray = true) => {
    const base = Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .message('Invalid ObjectId format');

    if (allowArray) {
        const alt: Joi.AlternativesSchema = Joi.alternatives().try(base, Joi.array().items(base));
        return isRequired ? alt.required() : alt.optional();
    }
};
export const uuidIdAlternatives = (isRequired = false, allowArray = true) => {
    const base = Joi.string().uuid().message('Invalid Uuid format');

    if (allowArray) {
        const alt: Joi.AlternativesSchema = Joi.alternatives().try(base, Joi.array().items(base));
        return isRequired ? alt.required() : alt.optional();
    }
};

export const customPagination = async (data: any[], page: number, limit: number, totalRecords: number) => {
    page = Math.max(1, page || PAGINATION.PAGE);
    limit = Math.max(1, limit || PAGINATION.LIMIT);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalRecords / limit);
    const currentPage = page;
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;
    const recordList = paginatedData;
    const paginatedDataWithPagination = {
        limit,
        totalRecords,
        totalPages,
        hasPreviousPage,
        currentPage,
        hasNextPage,
        recordList,
    };
    return paginatedDataWithPagination;
};

export const generateHmacSHA256 = (data: string, secret: string): string => {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

export const verifyHmacSHA256 = (data: string, secret: string, signature: string): boolean => {
    const generated = generateHmacSHA256(data, secret);
    return generated === signature;
};

export const generateVoucherCode = (format = 'XXXX-XXXX-XXXX-XXXX') => {
    const generateSegment = (length: number): string => {
        return crypto.randomBytes(length).toString('hex').toUpperCase().slice(0, length);
    };
    return format
        .split('-')
        .map(part => generateSegment(part.length))
        .join('-');
};
