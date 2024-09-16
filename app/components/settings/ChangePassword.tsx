'use client'

import InputWithIcon from '@/components/shared/InputWithIcon';
import LoadingButton from '@/components/shared/LoadingButton';
import { useToast } from '@/components/ui/use-toast';
import { changePassword } from '@/lib/actions/user-actions';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi2';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayButton, setDisplayButton] = React.useState(false);
  const path = usePathname();
  const { toast } = useToast();

  React.useEffect(() => {
    if (oldPassword !== '' && newPassword !== '') {
      setDisplayButton(true)
    }
  }, [oldPassword, newPassword]);

  const updatePassword = async () => {
    const data = { oldPassword: oldPassword, newPassword: newPassword, path: path }
    setIsLoading(true)
    await changePassword(data)
    .then((response) => {
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.success
        });
        setIsLoading(false);
        setNewPassword('')
        setOldPassword('');
      };

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error
        });
        setIsLoading(false);
      }
    })
  }
  
  return (
    <React.Fragment>
      <div>
        <h2>Change password</h2>
        <p className='text-sm'>Change your password. You can do this as many times as you like but it takes effect from the next login.</p>
      </div>
      <InputWithIcon
        type='password'
        icon={HiOutlineLockClosed}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder='enter old password'
        className='border rounded'
      />
      <InputWithIcon
        type='password'
        icon={HiOutlineLockClosed}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder='enter new password'
        className='border rounded'
      />
      {displayButton && (
        <div className="mt-2 flex items-center justify-end">
          <LoadingButton loading={isLoading} disabled={isLoading} onClick={updatePassword}>
            <p>{isLoading ? 'Updating password': 'Update password'}</p>
          </LoadingButton>
        </div>
      )}
    </React.Fragment>
  )
}

export default ChangePassword