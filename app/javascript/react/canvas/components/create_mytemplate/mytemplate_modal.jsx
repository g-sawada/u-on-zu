import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ErrorMessage from "../shared/error_message";
import ConfirmationDialog from "../shared/confirmation_dialog";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyTemplateModal({ graphSetting, open, handleClose }) {
  const {       //フォームの設定。register, handleSubmit, resetはuseFormから取得できる
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState(''); //サーバーエラーのステート

  //確認ダイアログのstateとハンドラ
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  //フォームの送信処理
  const onSubmit = async (data) => {
    try {
      const response = await createTemplate(  //バックへPOSTリクエスト, 後ろで定義
        data.title,
      )
      if (response.ok) {
        const responseData = await response.json();
        // console.log('送信リクエスト完了！')
        // console.log('responseData : ', responseData);
        reset();       //フォームのリセット
        handleClose();  //モーダルを閉じる
        handleOpenDialog(); //確認ダイアログを表示
      } else {
        const errorData = await response.json();
        setServerError('サーバーからの応答がエラーです。');
        // console.error('server response (error): ', errorData.error);
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。');
    }
  }

  // onSubmitで呼ばれるバックへの送信処理
  const createTemplate = async (title) => {
    const sendingGraphSetting = graphSetting // titleを空欄にするため，一旦graphSettingをコピー
    sendingGraphSetting.title = ""           // titleを空欄にする
    const response = await fetch('/api/templates', {  //エンドポイントは/api/graphsのPOST → api/graphsコントローラーのcreateアクションを参照
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: {
          title,
          graph_setting: sendingGraphSetting,
        },
      }),
    })
    return response;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="" sx={style}>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <h2 className="text-2xl font-bold" style={{marginBottom: '40px'}}>マイテンプレート保存</h2>

              {/* エラーメッセージ表示部分 */}
              <ErrorMessage message={serverError} />
              <ErrorMessage message={errors.title?.message || ''} />
              
              {/* Title */}
              <label htmlFor="title" className="mb-2 text-lg">
                テンプレートタイトル
              </label>
              <input
                {...register('title', {
                              // required: 'タイトルを入力して下さい。',
                              maxLength: {value: 255, message: 'タイトルは255文字以内で入力して下さい。'}})}                
                className="input input-bordered mb-5"
              />
              <button type="submit" className="btn mt-2">
                マイテンプレート保存
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <ConfirmationDialog open={openDialog} handleClose={handleCloseDialog}>
        マイテンプレートの保存が完了しました!
      </ConfirmationDialog>
    </>
  )
}

