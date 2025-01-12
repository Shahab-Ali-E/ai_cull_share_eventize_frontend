import React from 'react';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { GetUserStorage } from '@/lib/actions/GetUserStorage';

interface StorageUsedProps {
  module: 'smartCull' | 'smartShare'; // Prop to specify the module
}

const StorageUsed = async ({ module }: StorageUsedProps) => {
  try {
    const storage_used = await GetUserStorage();

    // Defaults in case of missing data
    const totalStorage =
      module === 'smartCull'
        ? storage_used.data?.total_smart_culling_storage || 0
        : storage_used.data?.total_smart_share_storage || 0;

    const usedStorageInBytes =
      module === 'smartCull'
        ? parseInt(storage_used.data?.total_smart_culling_storage_used || '0', 10)
        : parseInt(storage_used.data?.total_smart_share_storage_used || '0', 10);

    // Convert total storage to GB
    const totalStorageGB = totalStorage / (1024 * 1024 * 1024); // Bytes to GB
    const usedStorageInMB = usedStorageInBytes / (1024 * 1024); // Bytes to MB

    const usedStorage =
      usedStorageInMB >= 1024
        ? `${(usedStorageInMB / 1024).toFixed(2)} GB` // Convert to GB if >= 1024 MB
        : `${usedStorageInMB.toFixed(2)} MB`; // Otherwise, keep it in MB

    const percentageUsed = totalStorageGB > 0 ? (usedStorageInBytes / totalStorage) * 100 : 0;

    return (
      <div className="flex flex-col space-y-2 w-full justify-center items-end">
        {/* Progress Bar */}
        <Progress className="h-2" value={percentageUsed} />

        {/* Storage used */}
        <div className="flex flex-row">
          <Label className="flex flex-row text-sm text-primary space-x-1">
            <span className={`text-headingtext`}>{usedStorage}</span>
            <span>/</span>
            <span>{totalStorageGB.toFixed(2)} GB</span>
          </Label>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error while fetching storage details:", error);
    return (
      <div className="text-destructive">
        Unable to load storage details. Please try again later.
      </div>
    );
  }
};

export default StorageUsed;
