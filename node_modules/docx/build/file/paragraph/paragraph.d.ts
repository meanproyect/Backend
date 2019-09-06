import { Image } from "../../file/media";
import { Num } from "../../file/numbering/num";
import { XmlComponent } from "../../file/xml-components";
import { AlignmentType } from "./formatting/alignment";
import { IBorderOptions } from "./formatting/border";
import { IIndentAttributesProperties } from "./formatting/indent";
import { ISpacingProperties } from "./formatting/spacing";
import { HeadingLevel } from "./formatting/style";
import { LeaderType } from "./formatting/tab-stop";
import { Bookmark, Hyperlink } from "./links";
import { PictureRun, Run, TextRun } from "./run";
interface ITabStopOptions {
    readonly position: number;
    readonly leader?: LeaderType;
}
export interface IParagraphOptions {
    readonly text?: string;
    readonly border?: IBorderOptions;
    readonly spacing?: ISpacingProperties;
    readonly outlineLevel?: number;
    readonly alignment?: AlignmentType;
    readonly heading?: HeadingLevel;
    readonly bidirectional?: boolean;
    readonly thematicBreak?: boolean;
    readonly pageBreakBefore?: boolean;
    readonly contextualSpacing?: boolean;
    readonly indent?: IIndentAttributesProperties;
    readonly keepLines?: boolean;
    readonly keepNext?: boolean;
    readonly tabStop?: {
        readonly left?: ITabStopOptions;
        readonly right?: ITabStopOptions;
        readonly maxRight?: {
            readonly leader?: LeaderType;
        };
        readonly center?: ITabStopOptions;
    };
    readonly style?: string;
    readonly bullet?: {
        readonly level: number;
    };
    readonly numbering?: {
        readonly num: Num;
        readonly level: number;
        readonly custom?: boolean;
    };
    readonly children?: Array<TextRun | PictureRun | Hyperlink>;
}
export declare class Paragraph extends XmlComponent {
    private readonly properties;
    constructor(options: string | PictureRun | IParagraphOptions);
    addRun(run: Run): Paragraph;
    addHyperLink(hyperlink: Hyperlink): Paragraph;
    addBookmark(bookmark: Bookmark): Paragraph;
    addImage(image: Image): PictureRun;
    pageBreak(): Paragraph;
    referenceFootnote(id: number): Paragraph;
    addRunToFront(run: Run): Paragraph;
    addSequentialIdentifier(identifier: string): Paragraph;
}
export {};
