import { StaticImageData } from "next/image";
import create_workspace_gif from "@/images/AlgoCull-unscreen.gif"

export interface cullingStepsDataProps{
    title:string;
    steps:string[];
    gif:StaticImageData;
}

export const cullingStepsData:cullingStepsDataProps[] = [
    {
      title: 'Create Workspace',
      steps: [
        'Click on "Create Workspace".',
        'Enter a unique name, then click "Create".',
        'You can create multiple workspaces.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Import Photos',
      steps: [
        'Click on "Import Photos".',
        'Select the folder where your photos are located.',
        'Click "Import" to add the photos to your workspace.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Cull Photos',
      steps: [
        'Click on "Start Culling".',
        'Review the photos and remove unwanted ones.',
        'Click "Save" to finalize the selection.'
      ],
      gif: create_workspace_gif
    },
    {
      title: 'Export Photos',
      steps: [
        'Click on "Export".',
        'Choose the format and destination folder.',
        'Click "Export" to save your selected photos.'
      ],
      gif: create_workspace_gif
    }
  ];
