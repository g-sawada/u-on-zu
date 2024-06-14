import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ErrorMessage from "../shared/error_message";
import ConfirmationDialog from "../shared/confirmation_dialog";
import { createThumbnail } from "./createThumbnail";

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

export default function MyGraphModal({ graphSetting, cityId, open, handleClose }) {

  const {       //フォームの設定。register, handleSubmit, resetはuseFormから取得できる
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState(''); //サーバーエラーのステート
  const [isSubmitting, setIsSubmitting] = useState(false); //送信中のステート

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
    setIsSubmitting(true);

    try {
      //サムネイル画像の生成
      const thumbnailURL = await createThumbnail();

      const response = await createGraph(  //バックへPOSTリクエスト, 後ろで定義
        data.title,
        data.note,
        thumbnailURL
      )
      if (response.ok) {
        const responseData = await response.json();

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
    } finally {
      setIsSubmitting(false);
    }
  }

  // onSubmitで呼ばれるバックへの送信処理
  const createGraph = async (title, note, thumbnailURL) => {
    const response = await fetch('/api/graphs', {  //エンドポイントは/api/graphsのPOST → api/graphsコントローラーのcreateアクションを参照
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          graph: {
            title,
            note,
            graph_setting: graphSetting,
            city_id: cityId,
            thumbnail_url: thumbnailURL
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
              <h2 className="text-2xl font-bold" style={{marginBottom: '40px'}}>マイグラフ保存</h2>
              
              {/* エラーメッセージ表示部分 */}
              <ErrorMessage message={serverError} />
              <ErrorMessage message={errors.title?.message || ''} />
              <ErrorMessage message={errors.note?.message || ''} />
              
              {/* Title */}
              <label htmlFor="title" className="mb-2 text-lg">
                タイトル
              </label>
              <input
                {...register('title', {
                              required: 'タイトルを入力して下さい。',
                              maxLength: {value: 255, message: 'タイトルは255文字以内で入力して下さい。'}})}
                className="input input-bordered mb-5"
              />

              {/* Note */}
              <label htmlFor="note" className="mb-2 text-lg">
                メモ
              </label>
              <textarea
                {...register('note', {
                              maxLength: {value: 65535, message: 'メモは65535文字以内で入力して下さい。'}})}
                className="textarea textarea-bordered mb-5"
              />
              <button 
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : 'マイグラフ保存'}
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <ConfirmationDialog open={openDialog} handleClose={handleCloseDialog}>
        マイグラフの保存が完了しました!
      </ConfirmationDialog>
    </>
  )
}